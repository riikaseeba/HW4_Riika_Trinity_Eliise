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
    console.log("jõusin siia!!!!")
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


// Endpoint to insert JSON data into the PostgreSQL database
app.post('/api/loadData', async (req, res) => {
    try {
        console.log("Loading data into the database...");

        // Read the JSON file
        const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));
        const posts = data.posts;

        // Insert each post into the database
        for (const post of posts) {
            await pool.query(
                `INSERT INTO posts (date, author, profileImage, postImage, title, content, likes)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    post.date,
                    post.author,
                    post.profileImage,
                    post.postImage,
                    post.title,
                    post.content,
                    post.likes
                ]
            );
        }

        res.status(200).send({ message: "Data loaded successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Error loading data into the database" });
    }
});

// Endpoint to fetch all posts
app.get('/api/posts', async (req, res) => {
    try {
        console.log("Fetching all posts...");

        const allPosts = await pool.query("SELECT * FROM posts ORDER BY id");
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Error fetching posts" });
    }
});


// Endpoint to create a new post
app.post('/api/posts', async (req, res) => {
    try {
        console.log("Adding a new post...");
        const { date, author, profileImage, postImage, title, content, likes } = req.body;

        const newPost = await pool.query(
            `INSERT INTO posts (date, author, profileImage, postImage, title, content, likes)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [date, author, profileImage, postImage, title, content, likes]
        );

        res.status(201).json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Error adding a new post" });
    }
});

// Endpoint to delete a post
app.delete('/api/posts/:id', async (req, res) => {
    try {
        console.log("Deleting a post...");
        const { id } = req.params;

        const deleteResult = await pool.query(`DELETE FROM posts WHERE id = $1 RETURNING *`, [id]);

        if (deleteResult.rows.length === 0) {
            return res.status(404).send({ error: "Post not found" });
        }

        res.status(200).send({ message: "Post deleted successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Error deleting post" });
    }
});



//loggout
app.get('/auth/logout', (req, res) => {
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});