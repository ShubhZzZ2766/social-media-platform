const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    db.query('SELECT posts.* FROM posts JOIN follows ON posts.userId = follows.followeeId WHERE follows.followerId = ? ORDER BY posts.createdAt DESC', [userId], (err, results) => {
        if(err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;