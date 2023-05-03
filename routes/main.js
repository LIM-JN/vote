const express = require('express')
const  Subject  = require('../models/subject')

const router = express.Router()

router.get('/',async (req,res,next) => {
    try {
        const subjects = await Subject.findAll();
        let sum = 0;
        for (arg of subjects) {
            sum+=arg.voteNum;
        }
        res.render('main', { subjects , sum });
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.get('/subject',async (req,res,next) => {
    try {
        const data = await Subject.findAll();
        res.status(201).json(data)
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.post('/voting',async (req,res,next) => {
    try {
    res.cookie('haveVoted', true, { maxAge: 60000 });
    const value = await Subject.findOne(
        {where: {name: req.body.vote}}
    )
    const currentNum = value.voteNum

    const data = await Subject.update(
        {voteNum: currentNum + 1},
        {where:{name: req.body.vote}}
    )
    res.status(201).json(data)
    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router