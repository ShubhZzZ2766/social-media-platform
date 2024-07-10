const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    db.query('SELECT * FROM notifications WHERE userId = ?', [userId], (err, results) => {
        if(err) return res.status(500).send(err);
        res.send(results);
    });

});

module.exports = router;