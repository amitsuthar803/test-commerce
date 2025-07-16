import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice.js';

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
    <nav style={{ padding: '1rem', backgroundColor: '#eee', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {user && <span style={{ marginRight: '1rem' }}>👤 {user.username}</span>}
        <Link to="/checkout">🛒 Cart ({cartItems.length})</Link>

        {token ? (
          <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
        ) : (
          <Link to="/login" style={{ marginLeft: '1rem' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
