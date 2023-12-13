const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');
const { apiResponse } = require('../../helpers/httpExecptions');
require('dotenv').config();


const storage = new Storage();
const bucket = storage.bucket(process.env.BUCKET_NAME);

exports.upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb limit
    },
});

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }

        const ext = path.extname(req.file.originalname);
        const file = bucket.file(`${Date.now()}${ext}`);
        const Stream = file.createWriteStream({
            resumable: false,
        });

        Stream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
            res.status(200).json(apiResponse(200, 'Success', 'Image Uploaded', publicUrl));
        });

        Stream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}