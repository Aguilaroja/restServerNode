'use strict';

let views = {};

/**
 * Render index page
 */
views.index = (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.render('index');
  } else {
    res.render('index');
    //res.json('Server ready');
  }
};

/**
 * Render recovery page
 */
views.recovery = (req, res) => {
  res.render('recovery');
};

module.exports = views;
