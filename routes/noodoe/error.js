let error = {};

error.post =
  ('/',
  (req, res) => {
    res.status(400).json({
      ok: false,
      err: {
        message: 'Bad request'
      }
    });
  });

error.get =
  ('/',
  (req, res) => {
    res.status(400).json({
      ok: false,
      err: {
        message: 'Bad request'
      }
    });
  });

error.put =
  ('/',
  (req, res) => {
    res.status(400).json({
      ok: false,
      err: {
        message: 'Bad request'
      }
    });
  });

error.delete =
  ('/',
  (req, res) => {
    res.status(400).json({
      ok: false,
      err: {
        message: 'Bad request'
      }
    });
  });

module.exports = error;
