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
import { createArticle, upload } from '../controller/articleController.js';


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

router.post('/article', upload.single('thumbnail'), createArticle);
export default router;
