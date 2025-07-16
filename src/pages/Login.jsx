import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    console.log(formData)
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);




  return (
    <div style={{ padding: '2rem' }}>
      <h2 className=' mb-5 font-bold text-3xl'>Login</h2>
      <div className=' font-semibold'>
        <p>Username: emilys</p>
        <p>Password: emilyspass</p>
      </div>
      <form onSubmit={handleSubmit} className='flex gap-2 mt-5' >
        <input className=' border-2 p-1 rounded-md' name="username" placeholder="Username" onChange={handleChange} required />
        <input className='border-2 p-1 rounded-md' name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className=' bg-teal-800 text-white p-2 rounded-md' type="submit" disabled={loading}>Login</button>
      </form>
      {token && <p className='text-green-500'>Login successful!</p>}
      {error && <p className='text-red-500 capitalize font-semibold'>{error}</p>}
    </div>
  );
};

export default Login;
