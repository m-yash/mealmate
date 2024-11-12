import React, { useState, useEffect } from 'react';
import PageTitle from '../uicomponents/Typography/PageTitle';
import { Input, Label, Button, Card, CardBody } from '@windmill/react-ui';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function UpdateProfile() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     currentPassword: '',
//     newPassword: '',
//   });

//   const [certificate, setCertificate] = useState(null);
//   const [isChanged, setIsChanged] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     setIsChanged(true);
//   };

//   const handleFileChange = (e) => {
//     setCertificate(e.target.files[0]);
//     setIsChanged(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isChanged) return;

//     const updatedData = {};
//     for (const key in formData) {
//       if (formData[key]) {
//         updatedData[key] = formData[key];
//       }
//     }

//     const data = new FormData();
//     Object.keys(updatedData).forEach((key) => {
//       data.append(key, updatedData[key]);
//     });
//     if (certificate) {
//       data.append('food_handling_certificate', certificate);
//     }

//     try {
//       const response = await axios.put('http://localhost:5000/user/update-profile', data, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log('Profile updated successfully:', response.data);
//       setIsChanged(false);
//     } catch (error) {
//       console.error('Error updating profile:', error.response?.data || error.message);
//     }
//   };
function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newEmail: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    address: '',
  });
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [certificate, setCertificate] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const autocompleteInput = new window.autocomplete.GeocoderAutocomplete(
      document.getElementById("autocomplete"),
      '2f3d2883f0724021874e30978211eb3a'
    );

    const handleAddressSelect = (event) => {
      const { properties } = event || {};
      if (properties && properties.lat && properties.lon) {
        setCoordinates({ lat: properties.lat, lng: properties.lon });
        setFormData({ ...formData, address: properties.formatted });
        setIsChanged(true);
      }
    };

    autocompleteInput.on('select', handleAddressSelect);

    return () => {
      autocompleteInput.off('select', handleAddressSelect);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsChanged(true);
  };

  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return;

    const updatedData = {};
    for (const key in formData) {
      if (formData[key]) {
        updatedData[key] = formData[key];
      }
    }

    if (coordinates.lat && coordinates.lng) {
      updatedData.location = { type: 'Point', coordinates: [coordinates.lng, coordinates.lat] };
    }

    const data = new FormData();
    Object.keys(updatedData).forEach((key) => {
      data.append(key, updatedData[key]);
    });
    if (certificate) {
      data.append('food_handling_certificate', certificate);
    }
    data.append('email', userEmail);

    try {
      const response = await axios.put('http://localhost:5000/user/update-profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Profile updated successfully:', response.data);
      toast.success('Profile updated successfully');
      // Update localStorage if email has changed
      if (formData.newEmail && formData.newEmail !== userEmail) {
        localStorage.setItem('email', formData.newEmail);
        localStorage.setItem('user_id', response.data._id); // Assuming user ID is returned in response
    }
      setIsChanged(false);
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };
  return (
    <>
    <ToastContainer />
      <PageTitle>Update Profile</PageTitle>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Card>
            <CardBody>
              <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Update Name</p>
              <Label>
                <span>Name</span>
                <Input
                  className="mt-1"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter new name"
                />
              </Label>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Update Email</p>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  name="newEmail"
                  value={formData.newEmail}
                  onChange={handleChange}
                  placeholder="Enter new email"
                />
              </Label>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Update Phone</p>
              <Label>
                <span>Phone</span>
                <Input
                  className="mt-1"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter new phone number"
                />
              </Label>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Change Password</p>
              <Label>
                <span>Current Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                />
              </Label>
              <Label className="mt-4">
                <span>New Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </Label>
            </CardBody>
          </Card>
          <style>
            {`
                      .autocomplete-container {
                        position: relative;
                    
                      }
                    `}
          </style>
          <Card>

            <CardBody>
              <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Update Address</p>
              <Label><span>Address</span>
                <div id="autocomplete" className="autocomplete-container mt-1"></div>
              </Label>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Upload Certificate</p>
              <Label>
                <span>Food Handling Certificate</span>
                <input
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
            </CardBody>
          </Card>
        </div>

        <Button type="submit" className="mt-4" disabled={!isChanged}>
          Update Profile
        </Button>
      </form>
      
    </>
  );
}

export default UpdateProfile;

// import React, { useState } from 'react';
// import PageTitle from '../uicomponents/Typography/PageTitle';
// import { Input, Label, Button, Card, CardBody } from '@windmill/react-ui';
// import axios from 'axios';

// function UpdateProfile() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     currentPassword: '',
//     newPassword: '',
//   });

//   const [certificate, setCertificate] = useState(null);

//   const handleFileChange = (e) => {
//     setCertificate(e.target.files[0]);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedData = {};

//     // Only include fields that are non-empty
//     for (const key in formData) {
//       if (formData[key]) {
//         updatedData[key] = formData[key];
//       }
//     }

//     const data = new FormData();
//     Object.keys(updatedData).forEach((key) => {
//       data.append(key, updatedData[key]);
//     });
//     if (certificate) {
//       data.append('food_handling_certificate', certificate);
//     }

//     try {
//       const response = await axios.put('http://localhost:5000/user/update-profile', data, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log('Profile updated successfully:', response.data);
//       // Add any additional actions, like showing a success message
//     } catch (error) {
//       console.error('Error updating profile:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <>
//       <PageTitle>Update Profile</PageTitle>
//       <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
//       <form onSubmit={handleSubmit}>
//         <Label className="mt-4">
//           <span>Name</span>
//           <Input
//             className="mt-1"
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter new name"
//           />
//         </Label>
//         <Label className="mt-4">
//           <span>Email</span>
//           <Input
//             className="mt-1"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter new email"
//           />
//         </Label>
//         <Label className="mt-4">
//           <span>Phone</span>
//           <Input
//             className="mt-1"
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter new phone number"
//           />
//         </Label>
//         <Label className="mt-4">
//           <span>Current Password</span>
//           <Input
//             className="mt-1"
//             type="password"
//             name="currentPassword"
//             value={formData.currentPassword}
//             onChange={handleChange}
//             placeholder="Enter current password"
//           />
//         </Label>
//         <Label className="mt-4">
//           <span>New Password</span>
//           <Input
//             className="mt-1"
//             type="password"
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleChange}
//             placeholder="Enter new password"
//           />
//         </Label>
//         <Label className="mt-4">
//           <span>Food Handling Certificate</span>
//           <input
//             type="file"
//             name="food_handling_certificate"
//             onChange={handleFileChange}
//             style={{
//               marginTop: '8px',
//               padding: '8px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               display: 'block'
//             }}
//           />
//         </Label>
//         <Button type="submit" className="mt-4">Update Profile</Button>
//       </form>
//       </div>
//     </>
//   );
// }

// export default UpdateProfile;
