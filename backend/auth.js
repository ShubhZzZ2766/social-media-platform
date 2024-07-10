const express = require('express');
const router = express.Router();
const bcrypter = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

router.post('./register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypter.hash(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(200).send('User Registered');
    })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async  (err, result) => { 
        if(err) return res.status(500).send(err);
        if(result.length === 0) return res.status(400).send('User Not Found');
        const user = result[0];
        const isValid = await bcrypter.compare(password, user.password);
        if(!isValid) return res.status(400).send('Invalid Password');
        const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '1h'});
        res.send({token});
    });

});

module.exports = router;