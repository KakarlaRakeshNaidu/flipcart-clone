// backend/src/controllers/productController.js
const productService = require('../services/productService');

class ProductController {
  async getProducts(req, res, next) {
    try {
      // Use req.validated.query for Zod-coerced types (numbers, etc.)
      const result = await productService.getProducts(req.validated?.query || req.query);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json({ success: true, product });
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await productService.getCategories();
      res.json({ success: true, categories });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
