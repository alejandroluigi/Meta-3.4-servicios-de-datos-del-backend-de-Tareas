const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/tag.controller');

router.get('/', auth, ctrl.getAll);
router.get('/:id', auth, ctrl.getById);
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);
router.get('/:id/personas', auth, ctrl.getPersonas);

module.exports = router;