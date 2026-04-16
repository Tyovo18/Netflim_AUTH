import axios from 'axios';

const PORT = process.env.MAIL_SERVICE_PORT || 4005;

export const mailService = {
    sendAlertSignIn: async ({ to, username }) => {
    if (!to || !username) {
        throw new Error('mailService.sendAlertSignIn: "to" ou "username" manquant');
    }
    console.log('[mailService](netflim_auth)1 Envoi AlertSignIn:', { to, username });

    try {
        const data = {
            to: to,
            username: username
        };
        console.log('Data:', data);

        const res = await axios.post(
            `http://localhost:${PORT}/api/mail/alert-signin`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('[mailService](netflim_auth) SMTP response:', res.data);
        return res.data;
    } catch (err) {
        console.error('[mailService](netflim_auth) Erreur SMTP:', err.response?.data || err.message);
        throw err;
    }
    },


  sendAlertLogin: async ({ to, username }) => {
    if (!to || !username) {
      throw new Error('mailService.sendAlertLogin: "to" ou "username" manquant');
    }
    console.log('[mailService] Envoi AlertLogin:', { to, username });

    try {
      const res = await axios.post(`http://localhost:${PORT}/api/mail/alert-login`, {
        to,
        username,
      });
      console.log('[mailService] SMTP response:', res.data);
      return res.data;
    } catch (err) {
      console.error('[mailService] Erreur SMTP:', err.response?.data || err.message);
      throw err;
    }
  },

  sendResetPassword: async ({ to, username, resetLink }) => {
    if (!to || !username || !resetLink) {
      throw new Error('mailService.sendResetPassword: "to", "username" ou "resetLink" manquant');
    }
    console.log('[mailService] Envoi ResetPassword:', { to, username, resetLink });

    try {
      const res = await axios.post(`http://localhost:${PORT}/api/mail/reset-password`, {
        to,
        username,
        resetLink,
      });
      console.log('[mailService] SMTP response:', res.data);
      return res.data;
    } catch (err) {
      console.error('[mailService] Erreur SMTP:', err.response?.data || err.message);
      throw err;
    }
  },
};
