const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

//const users = [{ name: 'Name' }]
const users = []
router.get('/', async (req, res) => {
    try {
        res.json(users)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.post('/', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch (err) {
        res.status(500).send('Error ' + err)
    }
})

router.post('/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch (err) {
        res.status(500).send('Error ' + err)
    }
})

module.exports = router