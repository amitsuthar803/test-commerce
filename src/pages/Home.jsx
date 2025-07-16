import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const PRODUCTS_PER_PAGE = 10;

const Home = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

 
  useEffect(() => {
    const url =
      selectedCategory === 'all'
        ? 'https://dummyjson.com/products'
        : `https://dummyjson.com/products/category/${selectedCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setCurrentPage(1); 
      });
  }, [selectedCategory]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛍️ Products</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Category: </label>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {currentProducts.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem' }}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: '100%', height: '120px', objectFit: 'cover' }}
            />
            <h4>{product.title}</h4>
            <p>₹{product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ◀ Prev
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Home;
