// create a router
const router = require('express').Router()
//import models
const db = require('../models')
//GET bounties route
router.get('/', (req,res) => {
    // get all the bounties
    db.Bounty.find()
    .then(foundBounties =>{
    console.log(foundBounties)
    res.send(foundBounties)
    })
    .catch(err=>{
        console.log(err)
        // 503 = service unavailable
        res.status(503).send({message: 'Database asleep?'})
    })
})

router.get('/:id', (req,res) => {
    // get all the bounties
    db.Bounty.findById(req.params.id)
    .then(foundBounties =>{
        if(foundBounties){
            res.send(foundBounties)
        }else{
            res.status(404).send({message: 'Resource no located'})
        }
    })
        .catch(err=>{
            console.log(err)
            res.status(503).send({message: 'Service Unavailable'})
        })
     
})


router.post('/', (req,res) => {
    db.Bounty.create(req.body)
    .then(createdBounty=>{
        console.log(createdBounty)
        res.status(201).send(createdBounty)
    })
    .catch(err=>{
        console.log('Error while creating new bounty', err)
        if(err.name === 'Validation Error'){
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message: 'Database or server error!'})
        }
    })
})

router.put('/:id', (req,res) => {

    db.Bounty.findOneAndUpdate({
        _id: req.params.id
    },
    req.body,
    {
        new: true
    })
    .then(updatedBounty =>{
        res.send(updatedBounty)
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({messsage: 'SErver Error'})
    })
   
})

//DELETE/bounties

router.delete('/', (req,res) => {
    db.Bounty.deleteMany()
    .then(()=>{
        res.send({message: 'They \'re all gone!!'})
    })
    .catch(err => {
        console.log(err)
        res.status(503).send({message: 'Server Error'})
    })
})


//DELETE/bounties/:id
router.delete('/:id', (req,res) => {
    db.Bounty.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).send()
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'server error'})
    })
})

// export these routes so they can be used in index.js at models
module.exports = router