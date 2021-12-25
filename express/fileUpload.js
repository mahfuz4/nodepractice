const express = require('express');
const path = require('path');
const multer = require('multer');

// file uploaded folder
const UPLOADS_FOLDER = './uploads';

// define storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, '').toLocaleLowerCase().split(" ").join("-") + "-" + Date.now();
        cb(null, fileName + fileExt)
    },
});

// prepare the final multer uploaded object
const upload = multer({
    storage,
    limits: {
        fileSize: 10000000, // 1MB
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'avatar') {
            if (
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new Error('jpg, png, jpeg file are allowed!'));
            }
        } else if (file.fieldname === 'pdf') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('jpg, png, jpeg file are allowed!'));
            }
        }
    },
});

// express app object
const app = express();
// upload.single
// upload.array
// app.post(
//     '/',
//     upload.fields([
//         { name: 'avatar', maxCount: 1 },
//         { name: 'gallery', maxCount: 2 },
//     ]),
//     (req, res) => {
//         res.send('hello world');
//     },
// );

app.post(
    '/',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'pdf', maxCount: 1 },
    ]),
    (req, res) => {
        console.log(req.files.avatar);
        res.send('hello world');
    }
);
// error handler
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        next('This was upload error');
    } else if (err) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send('Internal error');
    }
});

// app listen
app.listen(3000, () => {
    console.log('application listen port 3000');
});
