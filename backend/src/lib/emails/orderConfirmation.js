// NEW
// Created this file to handle order confirmation emails via Resend.
// It uses the existing API key and safely wraps the send call in a try/catch.

const { Resend } = require('resend'); // NEW
const prisma = require('../prisma'); // NEW
const resend = new Resend(process.env.RESEND_API_KEY); // NEW

async function sendOrderConfirmationEmail(orderId, userId) { // NEW
    console.log(`[Email Debug] Attempting to send order confirmation for orderId: ${orderId}, userId: ${userId}`);
    const user = await prisma.user.findUnique({ where: { id: userId } }); // NEW
    if (!user) {
      console.log(`[Email Debug] User not found for id: ${userId}`);
      return;
    }
    if (!user.email) {
      console.log(`[Email Debug] User has no email: ${user.id}`);
      return;
    }
    console.log(`[Email Debug] Found user: ${user.email}`);

    const order = await prisma.order.findUnique({ // NEW
      where: { id: orderId }, // NEW
      include: { orderItems: { include: { product: true } } } // NEW
    }); // NEW

    if (!order) {
      console.log(`[Email Debug] Order not found for id: ${orderId}`);
      return;
    }
    console.log(`[Email Debug] Found order with ${order.orderItems.length} items. Total: ₹${order.totalAmount}`);

    const itemsHtml = order.orderItems.map(item =>  // NEW
      `<li>${item.product.name} (x${item.quantity}) - ₹${item.priceAtTime}</li>` // NEW
    ).join(''); // NEW

    const htmlContent = ` // NEW
      <h1>Order Confirmed – #${order.id}</h1> // NEW
      <p>Thank you for your order!</p> // NEW
      <h3>Order Details:</h3> // NEW
      <ul>${itemsHtml}</ul> // NEW
      <h3>Total Amount: ₹${order.totalAmount}</h3> // NEW
    `; // NEW

    const recipientEmail = process.env.TEST_EMAIL || user.email;
    console.log(`[Email Debug] Sending via Resend to recipient: ${recipientEmail} (TEST_EMAIL config: ${process.env.TEST_EMAIL ? 'YES' : 'NO'})`);

    const { data, error } = await resend.emails.send({ // NEW
      from: 'Flipkart Clone <onboarding@resend.dev>', // NEW
      to: recipientEmail, // NEW
      subject: `Order Confirmed – #${order.id}`, // NEW
      html: htmlContent // NEW
    }); // NEW

    if (error) { // NEW
      console.error('[Email Debug] Resend API returned an error:', error); // NEW
    } else { // NEW
      console.log('[Email Debug] Order confirmation email sent successfully. Data:', data); // NEW
    } // NEW
  } catch (err) { // NEW
    console.error('[Email Debug] Failed to execute order confirmation email function. Exception:', err); // NEW
  } // NEW
} // NEW

module.exports = { sendOrderConfirmationEmail }; // NEW
