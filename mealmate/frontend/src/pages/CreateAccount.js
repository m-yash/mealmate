import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button } from '@windmill/react-ui'

import axios from 'axios';



function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
    lat: '',
    lng: '',
    // role: 'user', // default to 'user'
  });

  // file upload: remove chef model
  const [certificate, setCertificate] = useState(null);
  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
  };
  const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (certificate) {
      data.append('food_handling_certificate', certificate);
    }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords don't match!");
    }
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:5000/user/create-account', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('User signed up successfully:', response.data);
      // Redirect user here if needed
    } catch (error) {
      console.error('There was an error signing up the user:', error.response?.data || error.message);
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <form onSubmit={handleSubmit}>
                <Label className="mt-4">
                  <span>Name</span>
                  <Input
                    className="mt-1"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    required />
                </Label>
                <Label className="mt-4">
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="john@doe.com"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    required />
                </Label>
                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    placeholder="***************"
                    type="password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    required />
                </Label>
                <Label className="mt-4">
                  <span>Confirm password</span>
                  <Input
                    className="mt-1"
                    placeholder="***************"
                    type="password"
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    required />
                </Label>

                <Label className="mt-4">
                  <span>Phone</span>
                  <Input
                    className="mt-1"
                    type="text"
                    value={formData.phone}
                    name="phone"
                    onChange={handleChange}
                    required />
                </Label>
                <Label className="mt-4">
                <span>Food Handling Certificate (optional)</span>
                <input
                  className="mt-1"
                  type="file"
                  name="food_handling_certificate"
                  onChange={handleFileChange}
                />
                </Label>

                <Label className="mt-4">
                  <span>Latitude</span>
                  <Input
                    className="mt-1"
                    type="number"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    required
                  />
                </Label>

                <Label className="mt-4">
                  <span>Latitude</span>
                  <Input
                    className="mt-1"
                    type="number"
                    name="lng"
                    value={formData.lng}
                    onChange={handleChange}
                    required
                  />
                </Label>

                <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2">
                    I agree to the <span className="underline">privacy policy</span>
                  </span>
                </Label>

                <Button
                  type="submit"
                  // tag={Link} 
                  // to="/login" 
                  block className="mt-4">
                  Create account
                </Button>
              </form>

              <hr className="my-8" />
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default SignUp
