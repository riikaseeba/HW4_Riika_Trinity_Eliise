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




/* Handling HTTP requests */

//adding a post
    app.post('/api/posts', async(req, res) => {
        try {
            console.log("a post request has arrived");
            const { body } = req.body;
            if (!body) {
                return res.status(400).json({ error: "Content is required" });
            }
    
            const post_date = new Date();

            const newPost = await pool.query(
                "INSERT INTO posttable (post_date, body) VALUES ($1, $2) RETURNING *",
                [post_date, body]
            );

            res.status(201).json(newPost.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });
//deleting all posts
    app.delete("/api/posts", async(req, res) => {
        try {
            console.log("removing all posts")
            const response = await pool.query(
                "TRUNCATE posttable"
            );
            res.json(response);
        } catch(err) {
            console.log(err)
        }
    })

//get post by id

    app.get('/api/posts/:id', async(req, res) => {
        try {
            console.log("get a post with route parameter request has arrived");
            // The req.params property is an object containing properties mapped to the named route "parameters". 
            // For example, if you have the route /posts/:id, then the "id" property is available as req.params.id.
            const { id } = req.params; // assigning all route "parameters" to the id "object"
            const posts = await pool.query( // pool.query runs a single query on the database.
                //$1 is mapped to the first element of { id } (which is just the value of id). 
                "SELECT * FROM posttable WHERE id = $1", [id]
            );
            res.json(posts.rows[0]); // we already know that the row array contains a single element, and here we are trying to access it
            // The res.json() function sends a JSON response. 
            // This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
        } catch (err) {
            console.error(err.message);
        }
    });

 //update a post
    app.put('/api/posts/:id', async(req, res) => {
        try {
            const { id } = req.params;
            const post = req.body;
            console.log("update request has arrived");
            const updatepost = await pool.query(
                "UPDATE posttable SET body = $2 WHERE id = $1", [id, post.body]
            );
            res.json(updatepost);
        } catch (err) {
            console.error(err.message);
        }
    });

//delete by id
    app.delete('/api/posts/:id', async(req, res) => {
        try {
            const { id } = req.params;
            console.log("delete a post request has arrived");
            const deletepost = await pool.query(
                "DELETE FROM posttable WHERE id = $1", [id]
            );
            res.json(deletepost);
        } catch (err) {
            console.error(err.message);
        }
    }); 
    
// get all postst
    app.get('/api/posts', async(req, res) => {
        try {
            console.log("get posts request has arrived");
            const posts = await pool.query(
                "SELECT * FROM posttable"
            );
            res.json(posts.rows);
        } catch (err) {
            console.error(err.message);
        }
    });


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
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
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
        if(user.rows.length===0) {
            console.log("User is not registered");
            return res.status(401).json({error:"User is not registered"});
        }

        // validatin password
        const validPassword = await bcrypt.compare(password,user.rows[0].password);
        console.log("validPassword:" + validPassword);
        if(!validPassword) {
            console.log("Incorrect password");
            return res.status(401).json({error: "Incorrect password"});
        }
        
        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({user_id:user.rows[0].id})
            .send;
    }catch(error){
        res.status(401).json({error: error.message});
    }
});

/*// Endpoint to create a new post
app.post('/api/posts', authenticateToken, async (req, res) => {
    try {
        const { title, body } = req.body;
        const user_id = req.user.id;  // Assuming 'authenticateToken' middleware adds 'user' to req
        
        if (!title || !body) {
            return res.status(400).json({ error: "Title and body are required" });
        }

        const result = await pool.query(
            `INSERT INTO posts (user_id, title, body, date_posted, date_updated)
             VALUES ($1, $2, $3, NOW(), NOW())
             RETURNING id, user_id, title, body, date_posted, date_updated`,
            [user_id, title, body]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Error creating new post" });
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
});*/
/*app.put('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        console.log("update request has arrived");
        const updatePost = await pool.query("UPDATE posts SET body = $1, date_updated = NOW() WHERE id = $2", [body, id]);
        res.json(updatePost);
    } catch (err) {
        console.error(err.message);
    }
});*/


//loggout
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

