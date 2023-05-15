const express = require('express');
const router = express.Router()
const { User, EventParticipant } = require('../models')
const bcrypt = require('bcrypt');
const {validateToken} = require("../middlewares/AuthMiddleware")
const { sign } = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const { id_num, password, first_name, middle_name, last_name, date_of_birth, email } = req.body
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            id_num: id_num,
            email: email,
            password: hash,
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            date_of_birth: date_of_birth,
        })
        res.json("User successfuly created.")
    })
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.json({ error: "User Not Found" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({ error: "Wrong Username And Password Combination" });
        }

        // Fetch the user's roles
        const roles = await user.fetchRoles();

        const accessToken = sign(
            {
                email: user.email, id: user.id, roles: roles.map(role => role.title)
            }, "secretphrase"
        );

        return res.json(accessToken);
    } catch (error) {
        // Handle any errors that occurred during the process
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/validate', validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = router