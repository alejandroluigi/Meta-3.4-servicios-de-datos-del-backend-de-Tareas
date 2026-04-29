const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/tarea.controller');

router.get('/', auth, ctrl.getAll);
router.get('/:id', auth, ctrl.getById);
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);
router.post('/:tareaId/tags/:tagId', auth, ctrl.addTag);
router.get('/:id/tags', auth, ctrl.getTags);

module.exports = router;