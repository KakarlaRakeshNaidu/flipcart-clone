// backend/src/lib/emails/orderConfirmation.js
// Order confirmation emails via shared Nodemailer transporter (Gmail).

const prisma = require('../prisma');
const transporter = require('../mailer');

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

    const itemsHtml = order.orderItems.map(item => `
      <div class="item">
        <div class="item-details">
          <div class="item-name">${item.product.name}</div>
          <div class="item-qty">Qty: ${item.quantity}</div>
        </div>
        <div class="item-price">₹${item.priceAtTime.toLocaleString('en-IN')}</div>
      </div>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f3f6; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background-color: #2874f0; padding: 24px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px; }
          .success-banner { background-color: #e8f5e9; padding: 20px; text-align: center; border-bottom: 1px solid #c8e6c9; }
          .success-banner h2 { color: #2e7d32; margin: 0 0 8px 0; font-size: 20px; font-weight: 600; }
          .success-banner p { color: #4caf50; margin: 0; font-size: 14px; }
          .content { padding: 32px; }
          .order-info { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #eeeeee; }
          .order-info p { color: #565656; font-size: 15px; line-height: 1.5; margin: 0 0 8px 0; }
          .order-info strong { color: #212121; }
          .items-list { margin-bottom: 24px; }
          .item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #f0f0f0; }
          .item:last-child { border-bottom: none; }
          .item-details { flex: 1; }
          .item-name { color: #212121; font-size: 15px; font-weight: 500; margin-bottom: 4px; }
          .item-qty { color: #878787; font-size: 13px; }
          .item-price { color: #212121; font-size: 16px; font-weight: 600; }
          .total-section { background-color: #fafafa; padding: 20px; border-radius: 8px; margin-top: 24px; }
          .total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
          .total-row.final { border-top: 1px dashed #d0d0d0; padding-top: 12px; margin-top: 12px; margin-bottom: 0; }
          .total-label { color: #565656; font-size: 14px; }
          .total-value { color: #212121; font-size: 15px; font-weight: 500; }
          .total-row.final .total-label { color: #212121; font-size: 16px; font-weight: 600; }
          .total-row.final .total-value { color: #2874f0; font-size: 20px; font-weight: 700; }
          .footer { background-color: #fafafa; padding: 20px; text-align: center; border-top: 1px solid #eeeeee; }
          .footer p { color: #878787; font-size: 12px; margin: 0; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Flipkart Clone</h1>
          </div>
          <div class="success-banner">
            <h2>Order Confirmed!</h2>
            <p>Thank you for shopping with us.</p>
          </div>
          <div class="content">
            <div class="order-info">
              <p>Hi there,</p>
              <p>We've received your order <strong>#${order.id}</strong> and are getting it ready for shipment.</p>
              <p>We'll send you another email when your package ships.</p>
            </div>
            
            <h3 style="color: #212121; font-size: 16px; margin: 0 0 16px 0;">Order Details</h3>
            <div class="items-list">
              ${itemsHtml}
            </div>
            
            <div class="total-section">
              <div class="total-row final">
                <div class="total-label">Total Amount</div>
                <div class="total-value">₹${order.totalAmount.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>If you have any questions about your order, please contact our support team.</p>
            <p style="margin-top: 12px;">© ${new Date().getFullYear()} Flipkart Clone. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
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

module.exports = { sendOrderConfirmationEmail };
