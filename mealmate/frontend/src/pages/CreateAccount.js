import React, { useState, useEffect } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import ImageLight from '../assets/img/chef1.jpeg';
import ImageDark from '../assets/img/chef1.jpeg';
import { Input, Label, Button, HelperText } from '@windmill/react-ui';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
    lat: '',
    lng: '',
  });

  const [certificate, setCertificate] = useState(null);
  const [errors, setErrors] = useState({});
  
  const history = useHistory();

  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) error = 'Name is required';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Provide a valid email';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = "Passwords don't match!";
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleAddressSelect = (value) => {
    if (value && value.properties) {
      const { lat, lon } = value.properties;
      setFormData((prevFormData) => ({
        ...prevFormData,
        lat,
        lng: lon,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        lat: '',
        lng: '',
      }));
    }
  };

  useEffect(() => {
    const autocompleteInput = new window.autocomplete.GeocoderAutocomplete(
      document.getElementById("autocomplete"),
      '2f3d2883f0724021874e30978211eb3a',
      {}
    );

    autocompleteInput.on('select', handleAddressSelect);

    return () => {
      autocompleteInput.off('select', handleAddressSelect);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return toast.error('Please fix the errors before submitting');
    }
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (certificate) {
        data.append('food_handling_certificate', certificate);
      }
      const response = await axios.post('http://localhost:5000/user/create-account', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Signed up successfully!');

      // Delay navigation to allow the toast to be seen
      setTimeout(() => {
        history.push({
          pathname: '/login',
          state: { email: formData.email, password: formData.password } // Pass email and password
        });
      }, 4000);

      console.log('User  signed up successfully:', response.data);
    } catch (error) {
      if (error.response?.data?.message === 'User already exists') {
        toast.error('Email already in use');
      } else {
        toast.error('An error occurred. Please try again.');
      }
      console.error('There was an error signing up the user:', error.response?.data || error.message);
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
              alt="Chef"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Chef"
            />
          </div>
          <main className ="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
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
                    required
                  />
                  {errors.name && <HelperText valid={false}>{errors.name}</HelperText>}
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
                    required
                  />
                  {errors.email && <HelperText valid={false}>{errors.email}</HelperText>}
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
                    required
                  />
                  {errors.password && <HelperText valid={false}>{errors.password}</HelperText>}
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
                    required
                  />
                  {errors.confirmPassword && <HelperText valid={false}>{errors.confirmPassword}</HelperText>}
                </Label>
                <Label className="mt-4">
                  <span>Phone</span>
                  <Input
                    className="mt-1"
                    type="text"
                    value={formData.phone}
                    name="phone"
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && <HelperText valid={false}>{errors.phone}</HelperText>}
                </Label>
                <Label className="mt-4">
                  <span>Food Handling Certificate (optional)</span>
                  <input
                    className="mt-1"
                    type="file"
                    name="food_handling_certificate"
                    onChange={handleFileChange}
                    style={{
                      marginTop: '8px',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'block'
                    }}
                  />
                </Label>
                <style>
                     {`
                       .autocomplete-container {
                         position: relative;
                       }
                     `}
                   </style>
                <Label className="mt-4">
                  <span>Address</span>
                  <div id="autocomplete" className="autocomplete-container mt-1"></div>
                </Label>
                <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2">
                    I agree to the <span className="underline">privacy policy</span>
                  </span>
                </Label>
                <Button
                  type="submit"
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
    </>
  );
}

export default SignUp;
// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

// // import ImageLight from '../assets/img/create-account-office.jpeg'
// import ImageLight from '../assets/img/chef1.jpeg'
// import ImageDark from '../assets/img/chef1.jpeg'

// // import ImageDark from '../assets/img/create-account-office-dark.jpeg'
// import { GithubIcon, TwitterIcon } from '../icons'
// import { Input, Label, Button } from '@windmill/react-ui'

// import axios from 'axios';



// function SignUp() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     confirmPassword: '',
//     lat: '',
//     lng: '',
//     // role: 'user', // default to 'user'
//   });

//   // file upload: remove chef model
//   const [certificate, setCertificate] = useState(null);
//   const handleFileChange = (e) => {
//     setCertificate(e.target.files[0]);
//   };
//   const data = new FormData();
//   Object.keys(formData).forEach((key) => {
//     data.append(key, formData[key]);
//   });
//   if (certificate) {
//     data.append('food_handling_certificate', certificate);
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       return alert("Passwords don't match!");
//     }
//     try {
//       console.log(formData);
//       const response = await axios.post('http://localhost:5000/user/create-account', data, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log('User signed up successfully:', response.data);
//       // Redirect user here if needed
//     } catch (error) {
//       console.error('There was an error signing up the user:', error.response?.data || error.message);
//     }
//   };

//   const handleAddressSelect = (value) => {
//     if (value && value.properties) {
//       const { lat, lon } = value.properties;
//       setFormData((prevFormData) => ({
//         ...prevFormData, // Preserve existing form data
//         lat,
//         lng: lon,
//       }));
//     } else {
//     // Clear lat and lng when no address is selected
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       lat: '',
//       lng: '',
//     }));
//   }
// };

//   useEffect(() => {
//     const autocompleteInput = new window.autocomplete.GeocoderAutocomplete(
//       document.getElementById("autocomplete"),
//       '2f3d2883f0724021874e30978211eb3a',
//       { /* options like country restriction if needed */ }
//     );

//     autocompleteInput.on('select', handleAddressSelect);

//     return () => {
//       autocompleteInput.off('select', handleAddressSelect);
//     };
//   }, []);

//   return (
//     <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
//       <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
//         <div className="flex flex-col overflow-y-auto md:flex-row">
//           <div className="h-32 md:h-auto md:w-1/2">
//             <img
//               aria-hidden="true"
//               className="object-cover w-full h-full dark:hidden"
//               src={ImageLight}
//               alt="Chef"
//             />
//             <img
//               aria-hidden="true"
//               className="hidden object-cover w-full h-full dark:block"
//               src={ImageDark}
//               alt="Chef"
//             />
//           </div>
//           <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
//             <div className="w-full">
//               <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
//                 Create account
//               </h1>
//               <form onSubmit={handleSubmit}>
//                 <Label className="mt-4">
//                   <span>Name</span>
//                   <Input
//                     className="mt-1"
//                     type="text"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     name="name"
//                     onChange={handleChange}
//                     required />
//                 </Label>
//                 <Label className="mt-4">
//                   <span>Email</span>
//                   <Input
//                     className="mt-1"
//                     type="email"
//                     placeholder="john@doe.com"
//                     value={formData.email}
//                     name="email"
//                     onChange={handleChange}
//                     required />
//                 </Label>
//                 <Label className="mt-4">
//                   <span>Password</span>
//                   <Input
//                     className="mt-1"
//                     placeholder="***************"
//                     type="password"
//                     value={formData.password}
//                     name="password"
//                     onChange={handleChange}
//                     required />
//                 </Label>
//                 <Label className="mt-4">
//                   <span>Confirm password</span>
//                   <Input
//                     className="mt-1"
//                     placeholder="***************"
//                     type="password"
//                     value={formData.confirmPassword}
//                     name="confirmPassword"
//                     onChange={handleChange}
//                     required />
//                 </Label>

//                 <Label className="mt-4">
//                   <span>Phone</span>
//                   <Input
//                     className="mt-1"
//                     type="text"
//                     value={formData.phone}
//                     name="phone"
//                     onChange={handleChange}
//                     required />
//                 </Label>
//                 <Label className="mt-4">
//                   <span>Food Handling Certificate (optional)</span>
//                   <input
//                     className="mt-1"
//                     type="file"
//                     name="food_handling_certificate"
//                     onChange={handleFileChange}
//                     style={{
//           marginTop: '8px',
//           padding: '8px',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           cursor: 'pointer',
//           display: 'block'
//         }}
//                   />
//                   <style>
//                     {`
//                       .autocomplete-container {
//                         position: relative;
//                       }
//                     `}
//                   </style>
//                 </Label>
//                 <Label className="mt-4">
//                   <span>Address</span>
//                   <div id="autocomplete" className="autocomplete-container mt-1"></div>
//                 </Label>

//                 {/* <Label className="mt-4">
//                   <span>Latitude</span>
//                   <Input
//                     className="mt-1"
//                     type="number"
//                     name="lat"
//                     value={formData.lat}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Label>

//                 <Label className="mt-4">
//                   <span>Latitude</span>
//                   <Input
//                     className="mt-1"
//                     type="number"
//                     name="lng"
//                     value={formData.lng}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Label> */}

//                 <Label className="mt-6" check>
//                   <Input type="checkbox" />
//                   <span className="ml-2">
//                     I agree to the <span className="underline">privacy policy</span>
//                   </span>
//                 </Label>

//                 <Button
//                   type="submit"
//                   // tag={Link} 
//                   // to="/login" 
//                   block className="mt-4">
//                   Create account
//                 </Button>
//               </form>

//               <hr className="my-8" />
//               <p className="mt-4">
//                 <Link
//                   className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
//                   to="/login"
//                 >
//                   Already have an account? Login
//                 </Link>
//               </p>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignUp
