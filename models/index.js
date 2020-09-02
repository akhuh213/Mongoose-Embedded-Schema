//set up mongoose connection
const mongoose = require('mongoose')
// mongo connection string
// this will automatically create the db if it doesn't already exist
mongoose.connect('mongodb://localhost/travel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})


// shortcut to our mongoose connection
const db = mongoose.connection
// set up an event listener to fire once the connection 'opens'
//to console.log what host and port it is running on
db.once('open', () => {
    console.log(`Connected to Mongodb at ${db.host}:${db.port}`)
})
//set up an event listener to fire on database error and console.log the error object
db.on('error', (err) => {
    console.log(`Database error:\n${err}`)
})
// module.exports.Bounty = require('./bounty')
module.exports.Travel = require('./travel')