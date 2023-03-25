const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator')

router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Email already used" })
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong :(")
    }


})

module.exports = router