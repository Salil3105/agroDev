const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middlewares/auth");


const authRouter = express.Router();

// SIGN UP
authRouter.post("/api/signup", async (req, res) => {
    try {
        console.log('in signup authRouter');
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "User with same email already exists!" });
        }
        const hashPassword = await bcryptjs.hash(password, 8)
        let user = new User({
            email,
            password: hashPassword,
            name,
        });
        user = await user.save();
        console.log(user);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Sign in
authRouter.post("/api/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "User with this email does not exist!" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
        }

        const token = jwt.sign({ id: user._id }, "passwordKey");
        console.log(token);
        console.log('Authenticated successfully');
        res.status(200).json({ token, ...user._doc });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// token is valid or invalid
authRouter.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) { return res.json(false); }
        const verified = jwt.verify(token, 'passwordKey');
        if (!verified) { return res.json(false); }
        const user = await User.findOne(verified.id);
        if (!user) { return res.json(false); }
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// get user information
authRouter.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user, token: req.token });
});

module.exports = authRouter;
