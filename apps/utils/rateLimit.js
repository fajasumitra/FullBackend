const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, //1 menit
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: function (req, res) {
    res.status(this.statusCode).json({
      message: "Too many requests, please try again later.",
    });
  },
});

module.exports = limiter;
