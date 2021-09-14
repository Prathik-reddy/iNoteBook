const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mynameisprathikabcdefghijklmnopqrstuvwxyz'

// Create a user using post "/api/auth/createUser"
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
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        console.log(authToken);

        res.json(authToken);

    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("some error occured");
    }

})

module.exports = router;