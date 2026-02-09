import express from 'express';
import { sendAlertLogin } from '../controllers/email.controller.js';

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

router.post('/alert-login', sendAlertLogin);

export default router;
