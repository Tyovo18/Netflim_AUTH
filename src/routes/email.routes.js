import express from 'express';
import { mailController } from '../controllers/email.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/mail/alert-login:
 *   post:
 *     summary: Send an alert when login
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 example: emi@gmail.com 
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Missing "to"
 *       500: 
 *         description: Error sending email
 */
router.post('/alert-login', mailController.sendAlertLogin);

/**
 * @swagger
 * /api/mail/reset-password:
 *   post:
 *     summary: Send an email to reset your password
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 example: emi@gmail.com 
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Missing "to"
 *       500: 
 *         description: Error sending email
 */
router.post('/reset-password', mailController.sendResetPassword);

/**
 * @swagger
 * /api/mail/alert-signin:
 *   post:
 *     summary: Send an email to confirm your email address and the creation of your account
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 example: emi@gmail.com 
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Missing "to"
 *       500: 
 *         description: Error sending email
 */
router.post('/alert-signin', mailController.sendAlertSignIn);


export default router;
