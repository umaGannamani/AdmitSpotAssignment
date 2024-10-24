const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendVerificationEmail = (email, token) => {
  const verificationUrl = `${process.env.APP_URL}/auth/verify/${token}`;
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on this link: ${verificationUrl}`,
  };

  transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = (email, token) => {
  const resetUrl = `${process.env.APP_URL}/auth/reset-password/${token}`;
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Reset Password',
    text: `You can reset your password by clicking on this link: ${resetUrl}`,
  };

  transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
