const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const JWT_TOKEN = 'jwt@token!.e@secret'

router.post('/createuser', [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password length should be greater than 5').isLength({ min: 5 }),
    body('name', 'Enter a valid name').isLength({ min: 3 })
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

        const salt = await bcrypt.genSalt(10)
        const secrectPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secrectPassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_TOKEN)

        res.json({ auth_token })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong :(")
    }


})

module.exports = router