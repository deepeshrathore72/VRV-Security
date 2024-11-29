const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require('./models/post');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret = 'fdmnerkcnmmwrkn';
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = 8080;
app.use(express.json());//used to parse the data coming from register page
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());


// const mongoUrl = "mongodb://127.0.0.1:27017/vrvSecurity";
const mongoUrl = "mongodb+srv://aniketrathor1:qTHryr3B00NGsVLS@cluster0.lp1jt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main().then(() => {
    console.log("connected to DB");
}).catch((err) => { console.error(err) });

async function main() {
    await mongoose.connect(mongoUrl);
}

const salt = bcrypt.genSaltSync(10);

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        let user1 = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        user1.save();
        res.json(user1);
        // user1.save().then(result => console.log(result));
    } catch (e) {
        res.status(400).json(e);
    }
    
    // res.json({requestData : {username, password}});
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user1 = await User.findOne({ username });
    if (user1 == null) {
        return res.status(401).json({ message: "User not found" });
    }
    const passOk = bcrypt.compareSync(password, user1.password);
    if (passOk) {
        jwt.sign(
            { username, id: user1._id, role: user1.role }, // Include role in the JWT payload
            secret,
            {},
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    message: "Logged in successfully",
                    id: user1._id,
                    role: user1.role,
                    username
                });
            }
        );
    } else {
        res.status(400).json("Invalid credentials");
    }
});


app.get("/profile", async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Fetch user details from the database using the ID in the token
        const user = await User.findById(info.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: user._id,
            username: user.username,
            role: user.role, // Include the role in the response
        });
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.listen(port, () => {
    console.log("app is listening on port 8080");
});