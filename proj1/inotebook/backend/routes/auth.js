const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {

    obj = {
        name: "Thanos",
        age: 1001
    }
    res.json(obj);
})

module.exports = router