const router = require('express').Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/', brandController.getAll);
router.delete('/:id', brandController.removeBrand);

module.exports = router;