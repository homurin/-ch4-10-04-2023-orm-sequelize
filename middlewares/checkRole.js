const ApiError = require("../utils/apiError");

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      console.log(req.user.role);
      if (req.user.role !== role) {
        next(new ApiError(`you are not ${role}`, 401));
      }
      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
