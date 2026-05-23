// backend/src/lib/mailer.js
// Shared Nodemailer transporter — used by both OTP emails and order confirmation emails.
// Requires EMAIL_USER and EMAIL_PASS (Gmail App Password) in .env.

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log(
  `[Mailer Init] Nodemailer transporter created. EMAIL_USER: ${
    process.env.EMAIL_USER || '(NOT SET)'
  }, EMAIL_PASS: ${process.env.EMAIL_PASS ? '****' + process.env.EMAIL_PASS.slice(-4) : '(NOT SET)'}`
);

module.exports = transporter;
