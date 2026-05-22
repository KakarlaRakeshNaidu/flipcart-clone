// NEW
// Created this file to handle order confirmation emails via Resend.
// It uses the existing API key and safely wraps the send call in a try/catch.

const { Resend } = require('resend'); // NEW
const prisma = require('../prisma'); // NEW
const resend = new Resend(process.env.RESEND_API_KEY); // NEW

async function sendOrderConfirmationEmail(orderId, userId) { // NEW
  try { // NEW
    const user = await prisma.user.findUnique({ where: { id: userId } }); // NEW
    if (!user || !user.email) return; // NEW

    const order = await prisma.order.findUnique({ // NEW
      where: { id: orderId }, // NEW
      include: { orderItems: { include: { product: true } } } // NEW
    }); // NEW

    if (!order) return; // NEW

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

    const { data, error } = await resend.emails.send({ // NEW
      from: 'Flipkart Clone <onboarding@resend.dev>', // NEW
      to: user.email, // NEW
      subject: `Order Confirmed – #${order.id}`, // NEW
      html: htmlContent // NEW
    }); // NEW

    if (error) { // NEW
      console.error('Resend API returned an error:', error); // NEW
    } else { // NEW
      console.log('Order confirmation email sent successfully:', data); // NEW
    } // NEW
  } catch (err) { // NEW
    console.error('Failed to execute order confirmation email function:', err); // NEW
  } // NEW
} // NEW

module.exports = { sendOrderConfirmationEmail }; // NEW
