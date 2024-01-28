const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function signup(req, res) {
    try {
        //get the email and password off req body
        const { email, password } = req.body;

        //hash passsword
        const hashedPassword = bcrypt.hashSync(password, 8);

        //create a user with the data
        await User.create({ email, password: hashedPassword });

        //respond
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);

    }

}

async function login(req, res) {
    try {
        //get the email and password off req body
        const { email, password } = req.body;

        //find the user with requested email
        const user = await User.findOne({ email });
        if (!user) return (res.sendStatus(401));

        //conpare sent in password with found user password hash
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return (res.sendStatus(401));

        //create a jwt token
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        var token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

        //set the cookie 
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        //send it
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);

    }

}

function logout(req, res) {
    try {
        res.clearCookie("Authorization");
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }

}

function checkAuth(req, res) {
    try {
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth
};