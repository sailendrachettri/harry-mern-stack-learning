const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'jwt@token!.e@secret'

// ROUTE 1:
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
        const auth_token = jwt.sign(data, JWT_SECRET)
        res.json({ auth_token })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong :(")
    }
})

// ROUTE 2: AUTHETICATE A USER
router.post('/login', [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    // variables
    let success = false

    // if error occured then send bad request
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Invalid credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, auth_token })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong :(")
    }
})


// ROUTE 3: GET LOGGED IN USER DETAILS. LOGIN REQUIRED
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong :(")
    }
})

module.exports = router