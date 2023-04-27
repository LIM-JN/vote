const express =require('express')

const  Subject  = require('../models/subject')

const router = express.Router()

router.get('/',(req,res,next) => {
    res.render('main')
})

router.post('/voting',async (req,res,next) => {
    try {
    console.log(req.body.vote)
    const data = await Subject.findAll();
    res.status(201).json(data)
    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router