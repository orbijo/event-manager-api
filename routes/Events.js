const express = require('express');
const router = express.Router()
const { Event, Schedule } = require('../models')
const {validateToken} = require("../middlewares/AuthMiddleware")
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
    const {
        eventName,
        description,
        schedule
    } = req.body
    
    dt = DateTime.fromISO(schedule, {zone: 'utc'})
    
    formattedSched = dt.toFormat("yyyy-MM-dd hh:mm:ss")

    await Event.create({
        eventName: eventName,
        description: description,
        schedule: formattedSched
    })
    res.json({
        eventName: eventName,
        description: description,
        schedule: formattedSched
    })
})

module.exports = router