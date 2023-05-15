const express = require('express');
const router = express.Router()
const { Event, Schedule, EventParticipant, User } = require('../models')
const { validateToken } = require("../middlewares/AuthMiddleware")
const { DateTime } = require('luxon');
const { Op } = require('sequelize')

// Fetch all events that are approved
router.get('/', async (req, res) => {
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
router.get('/approve', async (req, res) => {
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
router.post('/approve/:id', validateToken, async (req, res) => {
    const id = req.params.id
    const ApproverId = req.user.id
    const result = await Event.update({ ApproverId: ApproverId }, {
        where: {
            id: id
        }
    })
    res.json(result)
})

// View one event
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const event = await Event.findByPk(id)
    res.json(event)
})

// Create event
router.post("/", validateToken, async (req, res) => {
    const {
        eventName,
        description,
        schedule,
        about,
        category
    } = req.body
    const OrganizerId = req.user.id

    dt = DateTime.fromISO(schedule, { zone: 'utc' })

    formattedSched = dt.toFormat("yyyy-MM-dd hh:mm:ss")

    const result = await Event.create({
        eventName: eventName,
        description: description,
        schedule: formattedSched,
        OrganizerId: OrganizerId,
        about: about,
        category: category
    })
    res.json(result)
})



// User registers to an event
router.post('/join/:id', validateToken, async (req, res) => {
    const data = {
        EventId: req.params.id,
        UserId: req.user.id
    }
    const result = await EventParticipant.create(data)
    res.json(result)
})

// User leaves event
router.post('/leave/:id', validateToken, async (req, res) => {
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

router.get('/:eventId/users', async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Find the event by ID and include the associated users
        const event = await Event.findByPk(eventId, {
            include: [{ model: User, as: 'EventParticipants' }]
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Access the array of associated users using the 'EventParticipants' alias
        const participants = event.EventParticipants;

        res.json(participants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/verify/:eventId/:participantId', async (req, res) => {
    try {
        const { eventId, participantId } = req.params;
        const { attendedAt } = req.body;

        // Find the event participant record
        const eventParticipant = await EventParticipant.findOne({
            where: {
                UserId: participantId,
                EventId: eventId
            }
        });

        if (!eventParticipant) {
            return res.status(404).json({ message: 'Event participant not found.' });
        }

        // Update the attendedAt value
        eventParticipant.attendedAt = attendedAt;
        await eventParticipant.save();

        return res.status(200).json(eventParticipant);
    } catch (error) {
        console.error('Error updating attendance:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/check-registration/:id', validateToken, async (req, res) => {
    const eventId = req.params.id
    const userId = req.user.id
    const isRegistered = await EventParticipant.findOne({
        where: {
            UserId: userId,
            EventId: eventId
        }
    });

    res.json({ isRegistered })
});

router.delete('/:id', validateToken, async (req, res) => {
    try {
        const id = req.params.id;

        // Find the event by id and check if the user is the organizer
        const event = await Event.findOne({
            where: {
                id: id
            }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Delete the event
        await event.destroy();

        // Delete associated event participants
        await EventParticipant.destroy({
            where: {
                EventId: id
            }
        });

        res.json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router