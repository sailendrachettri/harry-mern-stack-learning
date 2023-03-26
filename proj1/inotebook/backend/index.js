const connectToMongo = require('./db')
const express = require('express')

connectToMongo()

const app = express()
const port = 5000

// middleware
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
    res.send("Hello world");
})

app.get('/api/v1/login', (req, res) => {
    res.send("Hello login");
})

app.listen(port, () => {
    console.log("listening at " + port);
})