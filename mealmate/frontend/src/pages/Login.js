import React, { useState, useEffect } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import axios from 'axios';

// import ImageLight from '../assets/img/login-office.jpeg'
// import ImageDark from '../assets/img/login-office-dark.jpeg'


import ImageLight from '../assets/img/chef2.jpg'
import ImageDark from '../assets/img/chef2.jpg'

import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const history = useHistory();
  const location = useLocation(); // Use useLocation to access the passed state

  const { login } = useAuth(); // Get the login function from AuthContext

  useEffect(() => {
    // Check if there's state passed from SignUp
    if (location.state) {
      const { email, password } = location.state;
      setFormData({ email, password }); // Set the email and password in the form
    }
  }, [location.state]);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate fields
    if (name === 'email') {
      setEmailValid(value.includes('@'));
    } else if (name === 'password') {
      setPasswordValid(value.length >= 4); // Example: Minimum 6 characters
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!emailValid || !passwordValid) {
      toast.error('Please provide valid email and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);
      const { token, email, user_id } = response.data;

      // Debugging: Check the token received
      console.log('Token received:', token);
      
      // Store token, email and user_id in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('user_id', user_id);

      // Call the login function from AuthContext
      login(token); // Store token and set authenticated state

      // Redirect to dashboard
      history.push('/app/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };
  return (
    <>
      <ToastContainer />
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
                      required />
                  </Label>

                  <Label className="mt-4">
                    <span>Password</span>
                    <Input className="mt-1"
                      name="password"
                      type="password"
                      placeholder="***************"
                      value={formData.password}
                      onChange={handleChange}
                      required />
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
    </>
  )
}

export default Login
