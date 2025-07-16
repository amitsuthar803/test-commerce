import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice.js';
import { GiCommercialAirplane } from 'react-icons/gi';
import { BsCart } from 'react-icons/bs';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className='p-4 bg-teal-800 text-white flex justify-between items-center' >
      <div>
        <Link to="/">Home</Link>
      </div>


      <h1 className='flex items-center gap-2'>Test Commerce <BsCart/></h1>
      <div>
        {user && <span className='mx-3'>👤 {user.username}</span>}
        <Link to="/checkout">🛒 Cart ({cartItems.length})</Link>

        {token ? (
          <button onClick={handleLogout} className='mx-3'>Logout</button>
        ) : (
          <Link to="/login" className='mx-3'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
