/* eslint-disable quotes */
exports.isAuth = function () {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: "Please log in." });
    }
  };
};

exports.isGuest = function () {
  return (req, res, next) => {
    if (req.user) {
      res.status(403).json({ message: "You already logged in." });
    } else {
      next();
    }
  };
};
