const multer = require('multer');
const fs = require('fs')
const dir = './images'

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});


module.exports = multer({ storage: storage }).single('image');