const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const authRoutes = require("./auth");
app.use('./auth', authRoutes);

const profileRoutes = require('./profile');
app.use('/profile', profileRoutes);

const postRouts = require('./posts');
app.use('/posts', postRouts);

const followRoutes = require('./follows');
app.use('/follows', followRoutes);