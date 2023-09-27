/* eslint-disable quotes */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/auth');
const { v2: cloudinary } = require('cloudinary');

const whitelist = [
    'http://localhost:5000',
    'http://localhost:5173',
    'https://threads-clone-roan-three.vercel.app',
    'https://threads-clone-wickedlolz.vercel.app/',
];

module.exports = (app) => {
    app.use(express.json({ limit: '50mb' }));
    app.use(cors({ origin: whitelist, credentials: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(authMiddleware());
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};
