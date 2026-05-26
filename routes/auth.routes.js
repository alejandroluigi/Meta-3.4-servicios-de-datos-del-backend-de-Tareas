import { Router } from 'express';
import auth from '../middleware/auth.js';
import * as ctrl from '../controllers/auth.controller.js';
const router = Router();

router.post('/register', ctrl.register);
router.post('/logout', ctrl.logout);
router.post('/login', ctrl.login);
router.get('/me', auth, ctrl.me);
/**/
export default router;