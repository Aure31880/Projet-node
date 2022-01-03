const express = require('express');
const router = express.Router();
const SauceController = require('../controllers/sauce');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.get('/', auth, SauceController.getSauces);
router.get('/:id', auth, SauceController.getOneSauce);
router.post('/', auth, multer, SauceController.createSauce);
router.post('/:id/like', auth, SauceController.liked);
router.put('/:id', auth, multer, SauceController.updateSauce);
router.delete('/:id', auth, SauceController.deleteSauce);

module.exports = router;