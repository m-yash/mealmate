import React, { useState } from 'react';

import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        lat: '',
        lng: '',
        role: 'user'  // default to 'user'
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/users/signup', formData);
          console.log('User signed up successfully:', response.data);
          // You can redirect or show a success message here
        } catch (error) {
          console.error('There was an error signing up the user:', error.response?.data || error.message);
        }
    };

    return (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
              <label>Latitude:</label>
              <input type="number" name="lat" value={formData.lat} onChange={handleChange} required />
            </div>
            <div>
              <label>Longitude:</label>
              <input type="number" name="lng" value={formData.lng} onChange={handleChange} required />
            </div>
            <div>
              <label>Role:</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="chef">Chef</option>
              </select>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
    );
};

export default Signup;
