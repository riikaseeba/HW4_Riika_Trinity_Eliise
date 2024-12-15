const express = require('express');
const pool = require('./database');
const app = express();
const cors = require('cors');
const bcrypt= require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});





app.use(cors({origin: 'http://localhost8081',credentials: true}));
app.use(express.json());
app.use(cookieParser());

const secret = "auhiuhdif7f87ajhjfahu784";
const maxAge = 3600;

function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/auth/authenticate', async(req, res) => {
    const token = req.cookies.jwt;

    let authenticated = false;
    try {
        if (token) {

            await jwt.verify(token, secret, (err) => {
                if (err) {
                    res.send({ "authenticated": authenticated });
                } else {
                    authenticated = true;
                    res.send({ "authenticated": authenticated });
                }
            })
        } else {
            res.send({ "authenticated": authenticated });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

const generateJWT = (id) => {
    return jwt.sign({id},secret,{expiresIn: maxAge})
}



//Signing up
app.post('/auth/signup', async (req,res) => {
    try{
        const {email,password} = req.body;

        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password,salt)

        const authuser = await pool.query("INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]);
        const token = await generateJWT(authuser.rows[0].id);
        res
            .status(201)
            .json({user_id: authuser.rows[0].id})
            .send;
    } catch (err){
        res.status(400).send(err.message);
    }

});

//logging in
app.post('/auth/login',async(req,res) =>{
    try{
        const{email,password} = req.body;
        const user =await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(user.rows.length===0) return res.status(401).json({error:"User is not registered"});

        const validPassword = await bcrypt.compare(password,user.rows[0].password);
        if(!validPassword) return res.status(401).json({error: "Incorrect password"});

        res
            .status(201)
            .json({user_id:user.rows[0].id})
            .send;
    }catch(error){
        res.status(401).json({error: error.message});
    }
});

// fetching all posts
app.get('/posts', authenticateToken, async(req, res) => {
try {
    const allPosts = await pool.query("SELECT * FROM posts ORDER BY date_posted ASC;");
    res.json(allPosts.rows);
} catch (err) {
    console.error(err.message);
}
});

// adding a new posts
app.post('/posts', authenticateToken, async (req, res) => {
    try {

        const { user_id, body } = req.body;
        const newPost = await pool.query("INSERT INTO posts (user_id, body) VALUES ($1, $2) RETURNING *", [user_id, body]);
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Delete all posts
app.delete('/posts',authenticateToken,  async (req, res) => {
    try {
        const allPosts = await pool.query("DELETE FROM posts");
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Fetch a specific post
app.get('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Update a post
app.put('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        const updatePost = await pool.query("UPDATE posts SET body = $1, date_updated = NOW() WHERE id = $2", [body, id]);
        res.json(updatePost);
    } catch (err) {
        console.error(err.message);
    }
});

//Delete a post
app.delete('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletePost = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        res.json(deletePost);
    } catch (err) {
        console.error(err.message);
    }
});

//loggout
app.get('/auth/logout', (req, res) => {
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});