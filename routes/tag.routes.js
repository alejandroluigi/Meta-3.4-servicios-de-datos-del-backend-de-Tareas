import { Router } from 'express';
import auth from '../middleware/auth.js';
import * as ctrl from '../controllers/tag.controller.js';
import admin from '../middleware/admin.js';
const router = Router();

router.get('/todos', auth, ctrl.getTodos);
router.get('/', auth, ctrl.getAll);
router.get('/:id', auth, ctrl.getById);
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);
router.get('/:id/personas', auth, ctrl.getPersonas);
router.get('/:id/tareas', auth, ctrl.getTareas);
router.post('/buscar-usuarios', auth, admin, ctrl.buscarPorUsuarios);
router.get('/usuario/:usuarioId', auth, admin, ctrl.getTagsPorUsuario);

export default router;