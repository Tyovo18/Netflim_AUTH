import { sendMail } from '../utils/mailer.js';
import { renderTemplate } from '../utils/templateEngine.js';

export const mailController = {
  // POST /api/mail/alert-login
  sendAlertLogin: async (req, res) => {
    try {
      const { to } = req.body; 

      if (!to) {
        return res.status(400).json({ message: 'Missing "to"' });
      }

      const html = renderTemplate('alertLogin');

      await sendMail({
        to,
        subject: 'Alerte de connexion à votre compte',
        html,
      });

      res.status(200).json({ message: 'Email sent successfully.' });
    } catch (err) {
      console.error('Erreur lors de l’envoi de l’email :', err);
      res.status(500).json({ message: 'Error sending email.', error: err.message });
    }
  },

  // POST /api/mail/reset-password
  sendResetPassword: async (req, res) => {
    try {
      const { to } = req.body; 

      if (!to) {
        return res.status(400).json({ message: 'Missing "to"' });
      }

      const html = renderTemplate('resetPassword');

      await sendMail({
        to,
        subject: 'Réinitialisation de mot de passe',
        html,
      });

      res.status(200).json({ message: 'Email sent successfully.' });
    } catch (err) {
      console.error('Erreur lors de l’envoi de l’email :', err);
      res.status(500).json({ message: 'Error sending email.', error: err.message });
    }
  },

  // POST /api/mail/alert-signin
  sendAlertSignIn: async (req, res) => {
    try {
      const { to } = req.body; 

      if (!to) {
        return res.status(400).json({ message: 'Missing "to"' });
      }

      const html = renderTemplate('alertSignIn');

      await sendMail({
        to,
        subject: 'Création de compte',
        html,
      });

      res.status(200).json({ message: 'Email sent successfully.' });
    } catch (err) {
      console.error('Erreur lors de l’envoi de l’email :', err);
      res.status(500).json({ message: 'Error sending email.', error: err.message });
    }
  }
  
}
