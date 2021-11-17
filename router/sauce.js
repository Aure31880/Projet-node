const express = require('express');
const router = express.Router();
const SauceController = require('../controllers/sauce');
const auth = require('../middleware/auth')

router.get('/', auth, SauceController.getSauces);
router.get('/:id', auth, SauceController.getOneSauce);
router.post('/', auth, SauceController.createSauce);
router.post('/:id/like', auth, SauceController.liked);
router.put('/:id', auth, SauceController.updateSauce);
router.delete('/:id', auth, SauceController.deleteSauce);

module.exports = router;