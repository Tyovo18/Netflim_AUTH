import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';


const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user account
 *     description: |
 *       Create a new user account.
 *       
 *       **Email notifications:**
 *       * A confirmation email is automatically sent to the provided address
 *       * Account is immediately active upon registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 example: emi_lim
 *               email:
 *                 type: string
 *                 format: email
 *                 example: emi@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: MySecurePass123
 *     responses:
 *       201:
 *         description: Account successfully created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/AuthResponse'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Registration successful. Confirmation email sent."
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email or username already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Account created but email failed to send
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/AuthResponse'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Account created but confirmation email could not be sent"
 */

router.post('/register', validate(registerSchema), authController.register);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: |
 *       Authenticate a user and get access token.
 *       
 *       **Security features:**
 *       * A login alert email is sent to notify the user
 *       * JWT token expires after 24 hours
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [identifier, password]
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email or username
 *                 example: emi@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: MySecurePass123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/AuthResponse'
 *                 - type: object
 *                   properties:
 *                     alertSent:
 *                       type: boolean
 *                       description: Whether a login alert email was sent
 *                       example: true
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify JWT access token
 *     tags: [Auth]
 *     security:
 *       - ServiceToken: []
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerifyResponse'
 *       401:
 *         description: Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Service token invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/verify', authenticate, authController.verify);

export default router;
