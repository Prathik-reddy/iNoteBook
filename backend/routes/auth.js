const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
    body,
    validationResult
} = require('express-validator');

// Create a user using post "/api/auth"
router.post("/", [
    body('email', "Enter a valid email address").isEmail(),
    body('name', "Enter a valid name").isLength({
        min: 5
    }),
    body('password', "Enter a valid password").isLength({
        min: 5
    }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        }).then(user => res.json(user))
        .catch((err) => {
            console.log(err);
            res.json({
                err: "pls enter a unique email address",
                msg: err.message
            });
        });
})

module.exports = router;