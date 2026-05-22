const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDb() {
  console.log("🔍 Checking Database Data...");
  const userCount = await prisma.user.count();
  const productCount = await prisma.product.count();
  
  console.log(`✅ Users found: ${userCount}`);
  console.log(`✅ Products found: ${productCount}`);
  
  if (productCount > 0) {
    const categories = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        id: true,
      },
    });
    console.log("Categories breakdown:");
    categories.forEach(c => {
      console.log(`  - ${c.category}: ${c._count.id} products`);
    });
  }
}

checkDb()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
