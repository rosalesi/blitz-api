const express = require('express');
let router = express.Router();

// Routes index page
router
    .route('/')
    .get(((req, res) => {
        res.send('Welcome to the blitz-api');
    })
);

module.exports = router;