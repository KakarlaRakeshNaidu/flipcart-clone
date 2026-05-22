require('dotenv').config();
const { sendOrderConfirmationEmail } = require('./src/lib/emails/orderConfirmation');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const user = await prisma.user.findFirst();
  if (!user) return console.log('no user');
  const order = await prisma.order.findFirst({ where: { userId: user.id } });
  if (!order) return console.log('no order');
  
  console.log('sending to', user.email);
  await sendOrderConfirmationEmail(order.id, user.id);
  console.log('done');
}
test();
