const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/', (req, res) => {
    const { userId, content } = req.body;
    db.query('INSERT INTO posts (userId, content) VALUES (?, ?)', [userId, content], (err, result) => {
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    db.query('UPDATE posts SET content = ? WHERE id = ?', [content, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Post updated');
    });

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Post deleted');
    });

});

module.exports = router;