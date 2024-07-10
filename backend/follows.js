const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/', (req, res) => {
    const { followerId, followeeId } = req.body;
    db.query('INSERT INTO follows (followerId, followeeId) VALUES (?, ?)', [followerId, followeeId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Followed');
    });
});

router.delete('/', (req, res) => {
    const { followerId, followeeId } = req.body;
    db.query('DELETE FROM follows WHERE followerId = ? AND followeeId = ?', [followerId, followeeId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status('Unfollowed');
    });
});

module.exports = router;