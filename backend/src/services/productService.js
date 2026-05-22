// backend/src/services/productService.js
// Business logic for product operations

const prisma = require('../lib/prisma');

class ProductService {
  /**
   * Get products with optional filtering, search, and pagination.
   */
  async getProducts({ category, subCategory, search, minPrice, maxPrice, sortBy, limit, offset }) {
    const where = {
      isAvailable: true,
      ...(category && { category }),
      ...(subCategory && { subCategory }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      },
    };

    const orderBy = {
      price_asc: { price: 'asc' },
      price_desc: { price: 'desc' },
      rating: { rating: 'desc' },
      newest: { createdAt: 'desc' },
    }[sortBy] || { createdAt: 'desc' };

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({ where, orderBy, take: parseInt(limit, 10), skip: parseInt(offset, 10) }),
      prisma.product.count({ where }),
    ]);

    return { products, total, limit, offset };
  }

  /**
   * Get a single product by ID.
   */
  async getProductById(id) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }
    return product;
  }

  /**
   * Get all unique categories and sub-categories.
   */
  async getCategories() {
    const categories = await prisma.product.groupBy({
      by: ['category', 'subCategory'],
      where: { isAvailable: true },
      _count: { id: true },
    });

    // Group by main category
    const grouped = categories.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { name: item.category, subCategories: [], count: 0 };
      }
      if (item.subCategory) {
        acc[item.category].subCategories.push({
          name: item.subCategory,
          count: item._count.id,
        });
      }
      acc[item.category].count += item._count.id;
      return acc;
    }, {});

    return Object.values(grouped);
  }
}

module.exports = new ProductService();
