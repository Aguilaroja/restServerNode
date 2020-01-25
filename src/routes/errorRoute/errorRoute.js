'use strict';

/**
 * Error handler
 */
const handle = (err, req, res, next) => {
  res.status(err.status || 500).json({
    ok: false,
    err: {
      message: 'Bad request'
    }
  });
  res.render('index', {
    message: err.message
  });
  res.status();
  next();
};

module.exports = {
  handle
};
