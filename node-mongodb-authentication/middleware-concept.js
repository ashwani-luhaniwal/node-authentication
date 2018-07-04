/**
 * Middleware runs after a request is received, but before a response is sent back. In this example 
 * the body-parser package is used as middleware. It converts incoming requests into a format that is 
 * easy to use for a JS program.
 * 
 * Middleware functions can be chained after each other and fit into the request/response cycle of the 
 * application. When writing custom middleware, next() always has to be called at the end of that 
 * middleware to move to the next one in the cycle.
 */

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    let err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

router.get('/profile', mid.requiresLogin, function(req, res, next) {
  //...
});