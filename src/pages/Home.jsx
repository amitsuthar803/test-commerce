import { useEffect, useState } from 'react';
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
    <div className=' p-8'>
      <h2 className=' text-2xl'>Products</h2>

      <div className=' mb-6'>
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

      <div class="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]"
      >
        {currentProducts.map((product) => (
          <div key={product.id} className='border-2 flex justify-between flex-col'>
            <div className='p-1'>

              <img
                src={product.thumbnail}
                alt={product.title}
                className=' object-cover'
              />
              <h4>{product.title}</h4>
              <p>₹{product.price}</p>
            </div>
            <button className=' bg-teal-800 text-white w-full mt-2 p-1' onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className=' mt-8 text-center'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className=' mx-4' >
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
