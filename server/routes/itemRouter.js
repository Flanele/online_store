const router = require('express').Router(); 
const itemController = require('../controllers/itemController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const ratingController = require('../controllers/ratingController');
const commentController = require('../controllers/commentController');

router.post('/', checkRole('ADMIN'), itemController.create);
router.get('/', itemController.getAll);
router.get('/:id', itemController.getOne);
router.delete('/:id', itemController.removeItem);
router.patch('/:id', itemController.updateItem);

router.post('/:id/rating', authMiddleware, ratingController.addRating);
router.get('/:id/ratings', ratingController.getRatings);
router.post('/:id/comments', authMiddleware, commentController.addComment);
router.get('/:id/comments', commentController.getComments);

module.exports = router;