import { Router } from 'express';
import auth from '../middleware/auth.js';
import * as ctrl from '../controllers/persona.controller.js';
const router = Router();

router.get('/', auth, ctrl.getAll);
router.get('/:id', auth, ctrl.getById);
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);
router.post('/:personaId/tareas/:tareaId', auth, ctrl.addTarea);
router.get('/:id/tareas', auth, ctrl.getTareas);
router.get('/:id/tags', auth, ctrl.getTags);
router.get('/buscar/:texto', auth, ctrl.buscar);
router.delete('/:personaId/tareas/:tareaId', auth, ctrl.removeTarea);

export default router;