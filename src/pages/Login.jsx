import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  console.log('token', token)
  const [formData, setFormData] = useState({ username: 'emilys', password: 'emilyspass' });

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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input value='emilys' name="username" placeholder="Username" onChange={handleChange} required />
        <input value='emilyspass' name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" disabled={loading}>Login</button>
      </form>
      {token && <p style={{ color: 'green' }}>Login successful!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
