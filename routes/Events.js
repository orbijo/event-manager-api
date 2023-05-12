const express = require('express');
const router = express.Router()
const { Event, Schedule } = require('../models')
const {validateToken} = require("../middlewares/AuthMiddleware")

router.get('/', async (req, res)=> {
    const allEvents = await Event.findAll()
    res.json(allEvents)
})

router.get('/:id', async (req, res)=> {
    const id = req.params.id
    const event = await Event.findByPk(id)
    res.json(event)
})

router.post("/", validateToken, async (req, res)=> {
    const post = req.body
    await Event.create(post)
    res.json(post)
})

module.exports = router