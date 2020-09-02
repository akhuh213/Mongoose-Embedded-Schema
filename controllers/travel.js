const router = require('express').Router()



const db = require('../models')



router.get('/', (req,res) => {
    db.Travel.find()
    .then(foundTravel => {
        console.log(foundTravel)
        res.send(foundTravel)
    })
    .catch(err=>{
        console.log(err)
        res.status.apply(503).send({message: 'Database asleep?'})
    })
})

router.post('/', (req,res) => {
    db.Travel.create(req.body)
    .then(createdTravel=>{
        console.log(createdTravel)
        res.status(201).send(createdTravel)
    })
    .catch(err=>{
        console.log('Error', err)
        if(err.name === 'validation Error'){
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message: 'Database or server error!'})
        }
    })
})

router.get('/:id', (req,res) =>{
    db.Travel.findById(req.params.id)
    .then(foundTravel => {
        if(foundTravel){
            res.send(foundTravel)
        }else{
            res.status(404).send({message: 'Resource no located'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(503).send({message: 'Service Unavailable'})
    })
})

router.put('/:id', (req,res)=>{

    db.Travel.findOneAndUpdate({
        _id:req.params.id
    },
    req.body,
    {
        new: true
    })
    .then(updatedTravel => {
        res.send(updatedTravel)
    })
    .catch(err => {
        console.log(err)
        res.status(503).send({message: 'server error'})
    })
})

router.delete('/', (req,res) => {
    db.Travel.deleteMany()
    .then(()=>{
        res.send({message: "it's gone"})
    })
    .catch(err => {
        console.log(err)
        res.status(503).send({message: 'server error'})
    })
})

router.delete('/:id', (req,res)=> {
    db.Travel.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).send()
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'server error'})
    }) 
})

module.exports = router;