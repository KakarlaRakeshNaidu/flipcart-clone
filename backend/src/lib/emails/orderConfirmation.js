// NEW
// Created this file to handle order confirmation emails via Resend.
// It uses the existing API key and safely wraps the send call in a try/catch.

const nodemailer = require('nodemailer');
const prisma = require('../prisma');

// Create a Nodemailer transporter using Gmail
// In production/Vercel, you should set EMAIL_USER and EMAIL_PASS environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOrderConfirmationEmail(orderId, userId, providedEmail = null) {
  try {
    console.log(`[Email Debug] Attempting to send order confirmation for orderId: ${orderId}, userId: ${userId}`);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    // Use the explicitly provided email from Checkout, OR fallback to the user's DB email
    const recipientEmail = providedEmail || (user ? user.email : null);

    if (!recipientEmail) {
      console.log(`[Email Debug] No recipient email found for order ${orderId}`);
      return;
    }
    console.log(`[Email Debug] Sending to: ${recipientEmail}`);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: { include: { product: true } } }
    });

    if (!order) {
      console.log(`[Email Debug] Order not found for id: ${orderId}`);
      return;
    }
    console.log(`[Email Debug] Found order with ${order.orderItems.length} items. Total: ₹${order.totalAmount}`);

    const itemsHtml = order.orderItems.map(item => 
      `<li>${item.product.name} (x${item.quantity}) - ₹${item.priceAtTime}</li>`
    ).join('');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2874f0;">Flipkart Clone</h2>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order <strong>#${order.id}</strong> has been confirmed.</p>
        
        <h3>Order Details:</h3>
        <ul>${itemsHtml}</ul>
        
        <h3>Total Amount: ₹${order.totalAmount}</h3>
        
        <p>We'll send you another email when your order ships.</p>
      </div>
    `;

    // Only attempt to send if credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('[Email Debug] Missing EMAIL_USER or EMAIL_PASS environment variables. Skipping actual email dispatch.');
      return;
    }

    const info = await transporter.sendMail({
      from: `"Flipkart Clone" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `Order Confirmed – #${order.id}`,
      html: htmlContent
    });

    console.log('[Email Debug] Order confirmation email sent successfully. MessageId:', info.messageId);
  } catch (err) {
    console.error('[Email Debug] Failed to execute order confirmation email function. Exception:', err);
  }
}

module.exports = { sendOrderConfirmationEmail }; // NEW
