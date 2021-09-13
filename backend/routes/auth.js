const express = require("express");
const router = express.Router();

router.get("/",(req,res) => {
    obj={
        a:"this is api/auth",
        number:3
    }
    res.json(obj)
})

module.exports = router;