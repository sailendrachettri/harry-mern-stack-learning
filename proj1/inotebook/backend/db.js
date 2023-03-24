const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    // mongoose.connect(mongoURI)
    // or
    mongoose.createConnection(mongoURI, () => {
        console.log("Connected successfully!");
    })
}

module.exports = connectToMongo