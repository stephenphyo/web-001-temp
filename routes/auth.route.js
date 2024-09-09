const router = require('express').Router();

/*** Controller Imports ***/
const authCtrl = require('../controllers/auth.controller');

/* POST */
router.post('/login', authCtrl.postLogin);
router.post('/register', authCtrl.postRegister);
router.post('/password/reset', authCtrl.postResetPasswordCheckEmail);
router.post('/password/reset/:id/otp', authCtrl.postResetPasswordVerifyOTP);

/* PATCH */
router.patch('/password/reset/:id/reset', authCtrl.patchResetPasswordReset);

/* GET */
router.get('/logout', authCtrl.getLogout);
router.get('/password/reset/:id', authCtrl.getResetPasswordSendEmail);

module.exports = router;