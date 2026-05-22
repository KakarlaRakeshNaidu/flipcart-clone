import React, { createContext, useContext, useState, useEffect } from 'react';
import { productApi } from '../services/api';
import { products as FALLBACK_PRODUCTS } from '../data/products';

const ProductContext = createContext();

/**
 * Maps a backend product object to the shape the frontend UI components expect.
 */
function mapBackendProduct(p) {
  return {
    ...p,
    // Frontend components expect these field names
    image: p.imageUrl || p.image,
    images: p.imageUrl ? [p.imageUrl] : (p.images || []),
    originalPrice: p.mrp || p.originalPrice,
    reviews: p.reviewCount ?? p.reviews ?? 0,
    discount: p.mrp && p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : (p.discount || 0),
  };
}

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch products from backend API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getProducts({ limit: 100 });
        const backendProducts = (data.products || data || []).map(mapBackendProduct);
        if (backendProducts.length > 0) {
          setAllProducts(backendProducts);
        } else {
          // Fallback to hardcoded data if backend returns empty
          setAllProducts(FALLBACK_PRODUCTS);
        }
      } catch (error) {
        console.warn('Failed to fetch products from backend, using fallback data:', error.message);
        setAllProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const categories = ["All", ...new Set(allProducts.map(p => p.category).filter(Boolean))];

  const filteredProducts = allProducts.filter(product => {
    const q = debouncedSearchQuery.toLowerCase();
    const matchesSearch =
      (product.name || '').toLowerCase().includes(q) ||
      (product.brand || '').toLowerCase().includes(q) ||
      (product.category || '').toLowerCase().includes(q);

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ProductContext.Provider value={{
      products: filteredProducts,
      allProducts,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      categories,
      loading,
      mapBackendProduct,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
