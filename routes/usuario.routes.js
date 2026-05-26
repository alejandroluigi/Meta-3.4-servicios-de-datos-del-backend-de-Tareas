import { Router } from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import * as ctrl from '../controllers/usuario.controller.js';
const router = Router();

router.get('/', auth, admin, ctrl.getAll);
router.get('/:id', auth, admin, ctrl.getById);
router.put('/:id', auth, admin, ctrl.update);
router.delete('/:id', auth, admin, ctrl.remove);
router.patch('/:id/activar', auth, admin, ctrl.activar);
router.patch('/:id/desactivar', auth, admin, ctrl.desactivar);
router.post('/buscar-tags', auth, admin, ctrl.buscarPorTags);

export default router;