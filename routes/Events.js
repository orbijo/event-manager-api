const express = require('express');
const router = express.Router()
const { Event, Schedule } = require('../models')
const {DateTime} = require('luxon');

router.get('/', async (req, res)=> {
    const allEvents = await Event.findAll()
    res.json(allEvents)
})

router.get('/:id', async (req, res)=> {
    const id = req.params.id
    const event = await Event.findByPk(id)
    res.json(event)
})

router.post("/", async (req, res)=> {
    const post = req.body
    dt = DateTime.fromISO(post.time)
    
    post.time = dt.toFormat("yyyy-MM-dd hh:mm:ss")

    post.EventId = post.id
    await Event.create(post)   //mao ni ang post nga gi insert
    await Schedule.create(post)//same sad ani
    res.json(post) //mao ni output sa preview same variable nga 'post'
})

module.exports = router