/* eslint-disable quotes */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/auth');

const whitelist = ['http://localhost:5000', 'http://localhost:5173'];

module.exports = (app) => {
    app.use(express.json());
    app.use(cors({ origin: whitelist, credentials: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(authMiddleware());
};
