const express = require('express');
const router = express.Router()
const { Event, Schedule, EventParticipant } = require('../models')
const {validateToken} = require("../middlewares/AuthMiddleware")
const {DateTime} = require('luxon');
const { Op } = require('sequelize')

// Fetch all events that are approved
router.get('/', async (req, res)=> {
    const allApprovedEvents = await Event.findAll({
        where: {
            ApproverId: {
                [Op.ne]: null
            }
        }
    })
    res.json(allApprovedEvents)
})

// Fetch all unapproved events
router.get('/approve', async (req, res)=> {
    const allForApproval = await Event.findAll({
        where: {
            ApproverId: {
                [Op.is]: null
            }
        }
    })
    res.json(allForApproval)
})

// Approve event by id
router.post('/approve/:id', validateToken, async (req, res)=> {
    const id = req.params.id
    const ApproverId = req.user.id
    const result = await Event.update({ ApproverId: ApproverId }, {
        where: {
            id: id
        }
    })
    req.json(result)
})

// View one event
router.get('/:id', async (req, res)=> {
    const id = req.params.id
    const event = await Event.findByPk(id)
    res.json(event)
})

// Create event
router.post("/", validateToken, async (req, res)=> {
    const {
        eventName,
        description,
        schedule,
    } = req.body
    const OrganizerId = req.user.id
    
    dt = DateTime.fromISO(schedule, {zone: 'utc'})
    
    formattedSched = dt.toFormat("yyyy-MM-dd hh:mm:ss")

    const result = await Event.create({
        eventName: eventName,
        description: description,
        schedule: formattedSched,
        OrganizerId: OrganizerId
    })
    res.json(result)
})

// User registers to an event
router.post('/join/:id', validateToken, async (req, res)=>{
    const data = {
        EventId: req.params.id,
        UserId: req.user.id
    }
    const result = await EventParticipant.create(data)
    res.json(result)
})

// User leaves event
router.post('/leave/:id', validateToken, async (req, res)=>{
    const UserId = req.user.id
    const EventId = req.params.id
    const result = await EventParticipant.destroy({
        where: {
            UserId: UserId,
            EventID: EventId
        }
    })
    res.json(result)
})

module.exports = router