import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as ALL_PRODUCTS } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const categories = ["All", ...new Set(ALL_PRODUCTS.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const q = debouncedSearchQuery.toLowerCase();
    const matchesSearch = 
      product.name.toLowerCase().includes(q) || 
      product.brand.toLowerCase().includes(q) || 
      product.category.toLowerCase().includes(q);
      
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ProductContext.Provider value={{
      products: filteredProducts,
      allProducts: ALL_PRODUCTS,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      categories
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

