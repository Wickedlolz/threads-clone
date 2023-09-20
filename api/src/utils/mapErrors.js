/* eslint-disable quotes */
exports.mapErrors = function (error) {
    if (Array.isArray(error)) {
        return error.map((e) => ({ path: e.path, msg: e.msg }));
    } else if (error.name == 'ValidationError') {
        return Object.values(error.errors)
            .map((e) => e.message)
            .join('\n');
    } else if (typeof error.message == 'string') {
        return error.message;
    } else {
        return 'Request error.';
    }
};
