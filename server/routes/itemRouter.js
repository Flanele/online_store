const router = require('express').Router(); 
const itemController = require('../controllers/itemController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', checkRole('ADMIN'), itemController.create);
router.get('/', itemController.getAll);
router.get('/:id', itemController.getOne);
router.delete('/:id', itemController.removeItem);
router.patch('/item/:id', itemController.updateItem);

router.post('/:id/rating', authMiddleware, itemController.addRating);
router.get('/:id/ratings', itemController.getRatings);


module.exports = router;