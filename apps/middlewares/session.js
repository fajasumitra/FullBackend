const session = require("express-session");

const initSession = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
};

module.exports = initSession;
