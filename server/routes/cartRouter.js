const router = require('express').Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, cartController.addToCart);
router.delete('/:id', authMiddleware, cartController.removeCartItem);


module.exports = router; 
