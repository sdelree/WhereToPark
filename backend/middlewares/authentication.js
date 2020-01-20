/**
 * This middleware tests whether the client sent an authentication along with its request
 * and sets the property "user" on the request if this is the case.
 */

const userService = require('../services/users');

function authenticationMiddleware(req, res, next) {
  if (req.session.userId) {
    userService.getUserById(req.session.userId)
      .then(user => {
        if (user) {
          const {password, ...loggedInUser} = user;
          req.user = loggedInUser;
        }
        next();
      });
  } else {
    next();
  }
}

module.exports = function() {
  return authenticationMiddleware;
};
