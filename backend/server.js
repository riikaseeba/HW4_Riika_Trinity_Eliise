const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt= require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();



app.use(cors({origin: 'http://localhost:8080',credentials: true}));

app.use(express.json());
app.use(cookieParser());

const secret = "auhiuhdif7f87ajhjfahu784";
const maxAge = 60 * 60;    //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next(); // pass the execution off to whatever request the client intended
    });
}


/* Handling HTTP requests */

app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt;

    let authenticated = false;
    try {
        if (token) {

            await jwt.verify(token, secret, (err) => {
                if (err) {
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated });
                } else {
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated });
                }
            })
        } else {
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated });
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});




//Signing up
app.post('/auth/signup', async (req,res) => {
    console.log("You made it!!!!")
    try{
        const {email,password} = req.body;

        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password,salt)

        const authuser = await pool.query("INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]);
        console.log(authuser.rows[0].id);
        const token = await generateJWT(authuser.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({user_id: authuser.rows[0].id})
            .send;
    } catch (err){
        console.error(err.message);
        res.status(400).send(err.message);
    }

});

//logging in
app.post('/auth/login',async(req,res) =>{
    try{
        console.log("a login request has arrived");
        const{email,password} = req.body;
        
        const user =await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(user.rows.length===0) return res.status(401).json({error:"User is not registered"});


        const validPassword = await bcrypt.compare(password,user.rows[0].password);
        if(!validPassword) return res.status(401).json({error: "Incorrect password"});
        
        const token = generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true })
            .json({user_id:user.rows[0].id})
            .send;
    }catch(error){
        res.status(401).json({error: error.message});
    }
});


// Delete a post
app.delete('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("delete a post request has arrived");
        const deletePost = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        res.json(deletePost);
    } catch (err) {
        console.error(err.message);
    }
});
app.put('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        console.log("update request has arrived");
        const updatePost = await pool.query("UPDATE posts SET body = $1, date_updated = NOW() WHERE id = $2", [body, id]);
        res.json(updatePost);
    } catch (err) {
        console.error(err.message);
    }
});


//loggout
app.get('/auth/logout', (req, res) => {
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});