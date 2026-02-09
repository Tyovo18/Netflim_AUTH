import { sendMail } from '../utils/mailer.js';
import { renderTemplate } from '../utils/templateEngine.js';

/**
 * Envoie un email d'alerte de connexion.
 * @route POST /api/mail/alert-login
 */
export const sendAlertLogin = async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ message: 'Missing "to"' });
  }

  try {
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
};
