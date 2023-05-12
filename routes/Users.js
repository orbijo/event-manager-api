const express = require('express');
const router = express.Router()
const { User } = require('../models')
const bcrypt = require('bcrypt');

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

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        res.json({ error: "User Not Found" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Username And Password Combination" });
            } else {
                const accessToken = sign(
                    { email: user.email, id: user.id },
                    "secretphrase"
                );
                res.json(accessToken);
            }
        });
    }
});

module.exports = router