const express = require('express')
const app = express()

// <<<< FORM DATA MIDDLEWARE >>>>
//Allows form data to be processed into req.body
app.use(express.urlencoded({extended: false}))

// tells express to recognized req.body as a json object 
app.use(express.json())


// includes the bounties controller
// app.use('/bounties', require('./controllers/bounties'))
app.use('/travel', require('./controllers/travel'))

app.get('/', (req, res) => {
    res.send(`it's home rout of the Mongo Bounty Server`)
})

app.listen(8000, () => {
    console.log('Yes, I am listening')
})


