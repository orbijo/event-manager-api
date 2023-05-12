const express = require('express');
const router = express.Router()
const { Schedule } = require('../models')
const {DateTime} = require('luxon');

router.get("/:eventId", async (req, res) => {
    const eventId = req.params.eventId;
    const schedule = await Schedule.findAll({ where: { EventId: eventId }});
    res.json(schedule)
});

router.post("/", async (req, res) => {
    const schedule = req.body;
    
    dt = DateTime.fromISO(schedule.time, {zone: 'utc+8'})
    
    schedule.time = dt.toFormat("yyyy-MM-dd hh:mm:ss")

    await Schedule.create(schedule);
    res.json(schedule);
});

module.exports = router