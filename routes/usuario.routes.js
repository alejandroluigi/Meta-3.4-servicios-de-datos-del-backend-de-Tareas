const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/usuario.controller');

router.get('/', auth, ctrl.getAll);
router.get('/:id', auth, ctrl.getById);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);
router.patch('/:id/activar', auth, ctrl.activar);
router.patch('/:id/desactivar', auth, ctrl.desactivar);

module.exports = router;