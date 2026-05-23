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
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f3f6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background-color: #2874f0; padding: 24px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px; }
            .content { padding: 40px 32px; text-align: center; }
            .content h2 { color: #212121; font-size: 20px; font-weight: 500; margin-top: 0; margin-bottom: 16px; }
            .content p { color: #565656; font-size: 15px; line-height: 1.5; margin-bottom: 24px; }
            .otp-box { background-color: #f0f5ff; border: 2px dashed #2874f0; border-radius: 8px; padding: 20px; display: inline-block; margin-bottom: 24px; }
            .otp-code { color: #2874f0; font-size: 32px; font-weight: 700; letter-spacing: 6px; margin: 0; }
            .footer { background-color: #fafafa; padding: 20px; text-align: center; border-top: 1px solid #eeeeee; }
            .footer p { color: #878787; font-size: 12px; margin: 0; line-height: 1.5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Flipkart Clone</h1>
            </div>
            <div class="content">
              <h2>Verify your email address</h2>
              <p>You've recently asked to log in or sign up. We just need to verify your email address to continue.</p>
              <div class="otp-box">
                <p class="otp-code">${otpCode}</p>
              </div>
              <p>Please enter this 6-digit code in the application.<br>This code will expire in <strong>10 minutes</strong>.</p>
            </div>
            <div class="footer">
              <p>If you didn't request this code, you can safely ignore this email.<br>Someone else might have typed your email address by mistake.</p>
              <p style="margin-top: 12px;">© ${new Date().getFullYear()} Flipkart Clone. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
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
    let user = await prisma.user.findUnique({ where: { email }});
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
