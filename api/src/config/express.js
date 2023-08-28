/* eslint-disable quotes */
const express = require('express');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/auth');
const cors = require('cors');

const whitelist = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:4200',
];

module.exports = (app) => {
    app.use(express.json());
    app.use(
        cors({
            origin: whitelist,
            credentials: true,
        })
    );
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(authMiddleware());
};
