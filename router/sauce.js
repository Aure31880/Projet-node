const express = require('express');
const router = express.Router();
const SauceController = require('../controllers/sauce');

router.get('/', SauceController.getSauces);
router.get('/:id', SauceController.getOneSauce);
router.post('/', SauceController.createSauce);
router.post('/:id/like', SauceController.liked);
router.put('/:id', SauceController.updateSauce);
router.delete('/:id', SauceController.deleteSauce);

module.exports = router;