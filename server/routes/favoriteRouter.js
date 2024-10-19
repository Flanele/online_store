const router = require('express').Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, favoriteController.getFavorites);
router.post('/', authMiddleware, favoriteController.addToFavorites);
router.delete('/:id', authMiddleware, favoriteController.removeFavorite);

module.exports = router;