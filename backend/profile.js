const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results[0]);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { bio, profilePicture } = req.body;
    db.query('UPDATE users SET bio = ?, profilePicture = ? WHERE id = ?', [bio, profilePicture, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Profile Updated');
    });
});

module.exports = router;