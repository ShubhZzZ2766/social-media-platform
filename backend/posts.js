const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('./', (req, res) => {
    db.query('INSERT INTO posts (userId, contest) VALUES (?, ?)', [userId. contest], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Post created');
    });
});

router.get('/', (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results)
    });
});

router.put('/id', (req, res) => {
    db.query('UPDATE posts SET contest = ? WHERE id = ?', [contest, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Post updated');
    });

});

router.delete('/id', (req, res) => {
    db.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Post deleted');
    });

});

module.exports = router;