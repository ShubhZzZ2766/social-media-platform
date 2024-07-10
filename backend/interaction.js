const express = require('express');
const router = express.Router();
const db = require('./db');

// Likes
router.post('/like', (req, res) => {
    const { userId, postId }= req.body;
    db.query('SELECT INTO likes (userId, postId) VALUES (?, ?)', [userId, postId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Liked');
    });
});

router.delete('/like', (req, res) => {
    const { userId, postId }= req.body;
    db.query('DELETE FROM likes WHERE userId = ? AND  postId = ?', [userId, postId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Unliked');
    });
});

// Comments
router.post('/comment', (req, res) => {
    const { userId, postId, content } = req.body;
    db.query('INSERT INTO comments (userId, postId, content) VALUES (?, ?, ?)', [userId, postId, content], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Commented');
    });
});

router.get('/comment/:postId', (req, res) => {
    const { postId } = req.params;
    db.query('SELECT * FROM comments WHERE postId = ?', [postId] , (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

module.exports = router;