import { Router } from 'express';
import auth from '../middleware/auth.js';
import * as ctrl from '../controllers/tarea.controller.js';
import admin from '../middleware/admin.js';
const router = Router();

router.get('/', auth, ctrl.getAll);
router.get('/buscar/:texto', auth, ctrl.buscar);
router.get('/:id', auth, ctrl.getById);
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);
router.post('/:tareaId/tags/:tagId', auth, ctrl.addTag);
router.get('/:id/tags', auth, ctrl.getTags);
router.get('/:id/persona', auth, ctrl.getPersona);
router.delete('/:tareaId/tags/:tagId', auth, ctrl.removeTag);
router.post('/buscar-tags', auth, ctrl.buscarPorTags);
router.post('/admin/buscar-tags', auth, admin, ctrl.buscarAdminPorTags);

export default router;