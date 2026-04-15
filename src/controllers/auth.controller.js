import { authService } from '../services/auth.service.js';
import { mailService } from '../services/email.service.js'; // utilise ce service !

export const authController = {
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body; 
      const result = await authService.register({ username, email, password });

      // Envoi du mail via le service
      try {
        await mailService.sendAlertSignIn({ to: email, username: username });
      } catch (err) {
        console.error('Erreur en envoyant le mail de création :', err.message);
      }

      return res.status(201).json({
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
        },
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { identifier, password } = req.body;
      const result = await authService.login({ identifier, password });

      try {
        await mailService.sendAlertLogin({ to: result.user.email, username: result.user.username });
      } catch (err) {
        console.error('Erreur en envoyant le mail login :', err.message);
      }

      return res.status(200).json({
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
        },
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  },

  verify: (req, res) => {
    return res.status(200).json({
      valid: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
      },
    });
  },
};
