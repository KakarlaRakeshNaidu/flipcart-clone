const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.product.findMany().then(products => {
  const bad = products.filter(p => p.imageUrl && p.imageUrl.includes('placeholder'));
  console.log('Bad products:', bad);
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
