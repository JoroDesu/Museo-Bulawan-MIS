  import express from 'express';
  import { login, logout, autoLogout, refreshToken, verifyCookie } from '../controller/authController.js';
  import { displayUsers, displaySpecificUser, getUserLoginLogs } from '../controller/userController.js';
  import { createAppointment, getAllAppointments } from '../controller/appointmentController.js';
  import { 
    sendInvitation, 
    getPendingInvitations, 
    resendInvitation, 
    revokeInvitation, 
    renderCompleteRegistration,
    completeRegistration,
    registrationSuccess
  } from '../controller/invitationController.js';
  import { createArticle, upload, getAllArticles} from '../controller/articleController.js';
  import multer from 'multer';

  const router = express.Router();

  router.post('/login', login);
  router.post('/logout', logout);

  router.get('/fetchUsers', autoLogout, displayUsers);
  router.get('/fetchUser/:id', autoLogout, displaySpecificUser);
  router.get('/login-logs/:userId', autoLogout, getUserLoginLogs);

  router.post('/appointment', createAppointment);
  router.get('/appointment', autoLogout, getAllAppointments);
  router.get('/refresh-token', refreshToken);
  router.get('/verify-cookie', verifyCookie);

  // Invitation endpoints
  router.post('/invitations', autoLogout, sendInvitation);
  router.get('/invitations', autoLogout, getPendingInvitations);
  router.post('/invitations/:id/resend', autoLogout, resendInvitation);
  router.delete('/invitations/:id', autoLogout, revokeInvitation);

  // Registration completion endpoints
  router.get('/complete-registration/:token', renderCompleteRegistration);
  router.post('/complete-registration/:token', completeRegistration);
  router.get('/registration-success', registrationSuccess);

  router.get('/articles', autoLogout, getAllArticles);
  
  router.post('/article', (req, res, next) => {
    upload.single('thumbnail')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer-specific error occurred
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ message: 'File too large. Max size is 5MB.' });
        }
        return res.status(500).json({ message: 'Multer error.', error: err.message });
      } else if (err) {
        // An unknown error occurred
        return res.status(500).json({ message: 'Unexpected error.', error: err.message });
      }
      // If everything went fine, proceed to controller
      next();
    });
  }, createArticle);

  export default router;
