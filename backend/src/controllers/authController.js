// backend/src/controllers/authController.js
// OTP-based authentication — sends OTP via Nodemailer (Gmail SMTP)
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const transporter = require('../lib/mailer');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
};

exports.sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Clear existing OTPs for this email
    await prisma.otp.deleteMany({
      where: { email }
    });

    // Save new OTP
    await prisma.otp.create({
      data: {
        email,
        code: otpCode,
        expiresAt
      }
    });

    // Send email using Nodemailer (Gmail)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('[Auth] Missing EMAIL_USER or EMAIL_PASS. OTP created in DB but email not sent.');
      // Still return success so dev/test can look up OTP from DB
      return res.json({ success: true, message: 'OTP generated (email credentials not configured)' });
    }

    await transporter.sendMail({
      from: `"Flipkart Clone" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Flipkart Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2874F0; margin-bottom: 24px;">Flipkart Clone</h2>
          <p style="font-size: 16px; color: #212121;">Hello,</p>
          <p style="font-size: 16px; color: #212121;">Your verification code is:</p>
          <div style="background-color: #f0f5ff; border: 1px dashed #2874F0; padding: 16px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #2874F0; margin: 24px 0; border-radius: 4px;">
            ${otpCode}
          </div>
          <p style="font-size: 14px; color: #878787;">This code will expire in 10 minutes. Please do not share this code with anyone.</p>
        </div>
      `
    });

    res.json({ success: true, message: 'OTP sent successfully' });

  } catch (err) {
    console.error('[Auth] sendOtp error:', err);
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const otpRecord = await prisma.otp.findFirst({
      where: { email, code }
    });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    // OTP is valid. Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Delete OTP
    await prisma.otp.delete({ where: { id: otpRecord.id } });

    if (user) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        success: true,
        isNewUser: false,
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } else {
      const signupToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' });
      return res.json({
        success: true,
        isNewUser: true,
        signupToken
      });
    }

  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { signupToken, name } = req.body;

    if (!signupToken || !name) {
      return res.status(400).json({ success: false, message: 'Signup token and Name are required' });
    }

    let decoded;
    try {
      decoded = jwt.verify(signupToken, JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid or expired signup token' });
    }

    const { email } = decoded;

    // Check if user already registered in the meantime
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name
        }
      });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (err) {
    next(err);
  }
};
