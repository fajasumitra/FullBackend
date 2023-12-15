const router = require("express").Router();
const verifyToken = require("../middlewares/authJWT.postgres");
const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/pg/user.controller");

const {
  getProfile,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  getProfileByUserId
} = require("../controllers/pg/profile.controller");

const {
  createHistory,
  getAllHistory,
  getHistoryById,
  updateHistory,
  deleteHistory,
} = require("../controllers/pg/history.controller");

const {
  createDetailObat,
  getAllDetailObat,
  getDetailObatById,
  updateDetailObat,
  deleteDetailObat,
  
} = require("../controllers/pg/detail_obat.controller");

const {
  createObat,
  getAllObat,
  getObatById,
  updateObat,
  deleteObat,
} = require("../controllers/pg/obat.controller");

const {
  createSchedule,
  getAllSchedule,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/pg/schedule.controller");

const {
  createTipe,
  getAllTipe,
  getTipeById,
  updateTipe,
  deleteTipe,
} = require("../controllers/pg/tipe.controller");

const {
  createFavorite,
  getAllFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
  deleteAllFavorite
} = require("../controllers/pg/favorite.controller");

const {
  getProfileAndUser,
  createProfileAndUser,
  updateProfileAndUser,
  deleteProfileAndUser,
  GetAllObatDetailObat
} = require("../controllers/pg/mixed.controller");

// const {
//   upload,
//   uploadImage
// } = require("../controllers/pg/uploadImage.controller");

const {
  upload,
  createPredict
} = require("../controllers/pg/predict.controller");

module.exports = (app) => {
  //user
  router.post("/register", createUser);
  router.post("/login", loginUser);
  router.get("/user", getUser);

  
  //profile
  router.use('/profile', verifyToken)
  router.post("/profile", createProfile);
  router.get("/profile", getProfile);
  router.get("/profile/:id", getProfileById);
  router.put("/profile/:id", updateProfile);
  router.delete("/profile/:id", deleteProfile);
  router.get("/profile/user/:id", getProfileByUserId);

  //history
  router.use('/history', verifyToken)
  router.post("/history", createHistory);
  router.get("/history", getAllHistory);
  router.get("/history/:id", getHistoryById);
  router.delete("/history/:id", deleteHistory);

  //detail_obat
  router.post("/detail_obat", createDetailObat);
  router.get("/detail_obat", getAllDetailObat);
  router.get("/detail_obat/:id", getDetailObatById);
  router.put("/detail_obat/:id", updateDetailObat);
  router.delete("/detail_obat/:id", deleteDetailObat);

  //obat
  router.post("/obat", createObat);
  router.get("/obat", getAllObat);
  router.get("/obat/:id", getObatById);
  router.put("/obat/:id", updateObat);
  router.delete("/obat/:id", deleteObat);

  //schedule
  router.use('/schedule', verifyToken)
  router.post("/schedule", createSchedule);
  router.get("/schedule", getAllSchedule);
  router.get("/schedule/:id", getScheduleById);
  router.put("/schedule/:id", updateSchedule);
  router.delete("/schedule/:id", deleteSchedule);

  //tipe
  router.post("/tipe", createTipe);
  router.get("/tipe", getAllTipe);
  router.get("/tipe/:id", getTipeById);
  router.put("/tipe/:id", updateTipe);
  router.delete("/tipe/:id", deleteTipe);

  //favorite
  router.use('/favorite', verifyToken)
  router.post("/favorite", createFavorite);
  router.get("/favorite", getAllFavorite);
  router.get("/favorite/:id", getFavoriteById);
  router.put("/favorite/:id", updateFavorite);
  router.delete("/favorite/:id", deleteFavorite);
  router.delete("/favorite", deleteAllFavorite);

  //mixed user and profile
  // router.use('/user/profile', verifyToken)
  router.get("/user/profile", getProfileAndUser);
  router.post("/user/profile", createProfileAndUser);
  router.put("/user/profile/:id", updateProfileAndUser);
  router.delete("/user/profile/:id", deleteProfileAndUser);

  //upload image
  router.post("/predict", upload.single('image'), createPredict);

  app.use("/api", router);
};
