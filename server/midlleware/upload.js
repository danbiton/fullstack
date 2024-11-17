const multer = require("multer");

const storage = multer.diskStorage({
    destination: "public/uploads",
    filename: function (req, file, cb) {
        const uniqueSuffix = Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg"
        || file.mimetype === "image/jpg"
        || file.mimetype === "image/png" 
        || file.mimetype === "image/webp") {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }
    // To reject this file pass `false`, like so:
    cb(null, false)
}


const upload = multer({
    storage, fileFilter, limits: {
        fileSize: 10000
    }
});


module.exports = upload;
