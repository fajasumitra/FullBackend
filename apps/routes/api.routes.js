const router = require('express').Router();
const verifyToken = require('../middlewares/authJWT.postgres');
const {createUser, loginUser, getUser} = require('../controllers/pg/user.controller');
const { getProfile, getProfileById, createProfile, updateProfile, deleteProfile } = require('../controllers/pg/profile.controller');
const { createHistory, getAllHistory, getHistoryById, updateHistory, deleteHistory } = require('../controllers/pg/history.controller');
const { createDetailObat, getAllDetailObat, getDetailObatById, updateDetailObat, deleteDetailObat } = require('../controllers/pg/detail_obat.controller');
const { createObat, getAllObat, getObatById, updateObat, deleteObat } = require('../controllers/pg/obat.controller');
const { createSchedule, getAllSchedule, getScheduleById, updateSchedule, deleteSchedule } = require('../controllers/pg/schedule.controller');
const { createTipeObat, getAllTipeObat, getTipeObatById, updateTipeObat, deleteTipeObat } = require('../controllers/pg/tipe_obat.controller');


module.exports = (app)=>{
    //user
    router.post('/register', createUser);
    router.post('/login', loginUser);
    router.get('/user', getUser);
    // router.get('/profile', verifyToken, (req, res) => {
    //     if (!req.user) {
    //         return res.status(401).json({ message: 'Invalid Token' });
    //     }
    //     res.status(200).json({ user: req.user.id });
    // });

    //profile
    router.post('/profile', createProfile);
    router.get('/profile', getProfile);
    router.get('/profile/:id', getProfileById);
    router.put('/profile/:id', updateProfile);
    router.delete('/profile/:id', deleteProfile);

    //history
    router.post('/history', createHistory);
    router.get('/history', getAllHistory);
    router.get('/history/:id', getHistoryById);
    router.put('/history/:id', updateHistory);
    router.delete('/history/:id', deleteHistory);

    //detail_obat
    router.post('/detail_obat', createDetailObat);
    router.get('/detail_obat', getAllDetailObat);
    router.get('/detail_obat/:id', getDetailObatById);
    router.put('/detail_obat/:id', updateDetailObat);
    router.delete('/detail_obat/:id', deleteDetailObat);

    //obat
    router.post('/obat', createObat);
    router.get('/obat', getAllObat);
    router.get('/obat/:id', getObatById);
    router.put('/obat/:id', updateObat);
    router.delete('/obat/:id', deleteObat);

    //schedule
    router.post('/schedule', createSchedule);
    router.get('/schedule', getAllSchedule);
    router.get('/schedule/:id', getScheduleById);
    router.put('/schedule/:id', updateSchedule);
    router.delete('/schedule/:id', deleteSchedule);

    //tipe_obat
    router.post('/tipe_obat', createTipeObat);
    router.get('/tipe_obat', getAllTipeObat);
    router.get('/tipe_obat/:id', getTipeObatById);
    router.put('/tipe_obat/:id', updateTipeObat);
    router.delete('/tipe_obat/:id', deleteTipeObat);

    app.use('/api', router);
}