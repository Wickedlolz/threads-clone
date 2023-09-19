/* eslint-disable quotes */
const { validateToken, isBlacklistedToken } = require('../services/auth');

module.exports = function () {
    return async (req, res, next) => {
        const token = req.cookies[process.env.COOKIE_NAME] || undefined;

        if (token) {
            try {
                const payload = await validateToken(token);
                const tokenBlacklist = await isBlacklistedToken(token);

                if (tokenBlacklist) {
                    throw new Error('Blacklisted token!');
                }

                req.user = {
                    email: payload.email,
                    id: payload._id,
                    token,
                };
            } catch (error) {
                return res
                    .status(403)
                    .clearCookie(process.env.COOKIE_NAME)
                    .json({ message: 'Invalid access token. Please sign in.' });
            }
        }

        next();
    };
};
