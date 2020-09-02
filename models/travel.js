const mongoose = require('mongoose')



const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String
    },
    duration: {
        type: Number
    },
    ticketPrice:{
        type: Number
    }
})


const travelSchema = new mongoose.Schema({
    destination: {
        type: String,
        default: "Do your homework"
    },
    flights: [flightSchema]
})

travelSchema.methods.sayHello = function() {
    return "Hi" + this.name;
}


module.exports = mongoose.model('Travel', travelSchema)
