const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/google/login', ctrl.googleLogin);
router.get('/google/callback', ctrl.googleCallback);

module.exports = router;