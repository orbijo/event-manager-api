const express = require('express');
const router = express.Router()
const { Event, Schedule } = require('../models')
const {validateToken} = require("../middlewares/AuthMiddleware")
const {DateTime} = require('luxon');
const { Op } = require('sequelize')

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

router.post('/approve/:id', validateToken, async (req, res)=> {
    const id = req.params.id
    const ApproverId = 1
    await Event.update({ ApproverId: ApproverId }, {
        where: {
            id: id
        }
    })
})

router.get('/:id', async (req, res)=> {
    const id = req.params.id
    const event = await Event.findByPk(id)
    res.json(event)
})

router.post("/", validateToken, async (req, res)=> {
    const {
        eventName,
        description,
        schedule,
    } = req.body
    const OrganizerId = req.user.id
    
    dt = DateTime.fromISO(schedule, {zone: 'utc'})
    
    formattedSched = dt.toFormat("yyyy-MM-dd hh:mm:ss")

    await Event.create({
        eventName: eventName,
        description: description,
        schedule: formattedSched,
        OrganizerId: OrganizerId
    })
})

module.exports = router