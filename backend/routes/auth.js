const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser')

const JWT_SECRET = 'mynameisprathikabcdefghijklmnopqrstuvwxyz';

// Route 1 : Create a user using post "/api/auth/createUser"
router.post("/createUser", [
    body('email', "Enter a valid email address").isEmail(),
    body('name', "Enter a valid name").isLength({
        min: 5
    }),
    body('password', "Enter a valid password").isLength({
        min: 5
    }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // check whether the user with this email alreay exists
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            return res.status(400).json({
                err: "user with this email already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);

        res.json(authToken);

    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("Internal server error occured");
    }

})
//Route 2 : Authenticate a user using POST "/api/auth/login"
router.post("/login", [
    body('email', "Enter a valid email address").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                error: "pls provide correct credentials"
            });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({
                error: "pls provide correct credentials"
            });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({
            authToken
        });
    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("Internal server error occured");
    }
})

// Route 3 : Get loggedin user Details using POST "/api/auth/getuser" : login required
router.post("/getUser", fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("Internal server error occured");
    }
})

module.exports = router;