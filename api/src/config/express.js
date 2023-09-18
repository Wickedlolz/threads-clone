/* eslint-disable quotes */
const express = require('express');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/auth');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(authMiddleware());
};
