import React, { useState } from 'react'
import { useHistory , Link } from 'react-router-dom'
import axios from 'axios';

// import ImageLight from '../assets/img/login-office.jpeg'
// import ImageDark from '../assets/img/login-office-dark.jpeg'


import ImageLight from '../assets/img/chef2.jpg'
import ImageDark from '../assets/img/chef2.jpg'

import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);
      const { token, email, user_id} = response.data;

      // Store token, email and user_id in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('user_id', user_id);

      // Redirect to dashboard
      history.push('/app');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form onSubmit={handleSubmit}>
                <Label>
                  <span>Email</span>
                  <Input className="mt-1"
                    name="email"
                    type="email"
                    placeholder="john@doe.com"
                    value={formData.email} 
                    onChange={handleChange}
                    required/>
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input className="mt-1"
                    name="password"
                    type="password"
                    placeholder="***************"
                    value={formData.password}
                    onChange={handleChange} 
                    required/>
                </Label>

                <Button className="mt-4"
                  block
                  type="submit">
                  Log in
                </Button>
              </form>
              <hr className="my-8" />


              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login