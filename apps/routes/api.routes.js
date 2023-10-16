const router = require('express').Router();
const verifyToken = require('../middlewares/authJWT');
const {signin, signup} = require('../controllers/auth');

module.exports = (app)=>{
    //user
    router.post('/register', signup);
    router.post('/login', signin);
    router.get("/hiddencontent", verifyToken, function (req, res) {
        if (!req.user) {
          res.status(403)
            .send({
              message: "Invalid JWT token"
            });
        }
        if (req.user.role === "admin") {
          res.status(200)
            .send({
              message: "Congratulations! but there is no hidden content"
            });
        } else if(req.user.role === "user") {
          res.status(403)
            .send({
              message: "Unauthorised access"
            });
        }
      });

    app.use('/api', router);
}