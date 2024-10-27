import React, { useState } from 'react'

import PageTitle from '../uicomponents/Typography/PageTitle'
import CTA from '../uicomponents/CTA'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from '@windmill/react-ui'

// function Modals({ isModalOpen, closeModal }) {
//   // const [isModalOpen, setIsModalOpen] = useState(false)

//   // function openModal() {
//   //   setIsModalOpen(true)
//   // }

//   // function closeModal() {
//   //   setIsModalOpen(false)
//   // }

//   return (
//     <>
//       <Modal isOpen={isModalOpen} onClose={closeModal} >
//         <ModalHeader>I need someone who can make ~</ModalHeader>
//         <ModalBody>
//           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum et eligendi repudiandae
//           voluptatem tempore!
//         </ModalBody>
//         <ModalFooter>
//           {/* I don't like this approach. Consider passing a prop to ModalFooter
//            * that if present, would duplicate the buttons in a way similar to this.
//            * Or, maybe find some way to pass something like size="large md:regular"
//            * to Button
//            */}
//           <div className="hidden sm:block">
//             <Button layout="outline" onClick={closeModal}>
//               Cancel
//             </Button>
//           </div>
//           <div className="hidden sm:block">
//             <Button>Accept</Button>
//           </div>
//           <div className="block w-full sm:hidden">
//             <Button block size="large" layout="outline" onClick={closeModal}>
//               Cancel
//             </Button>
//           </div>
//           <div className="block w-full sm:hidden">
//             <Button block size="large">
//               Accept
//             </Button>
//           </div>
//         </ModalFooter>
//       </Modal>
//     </>
//   )
// }

// export default Modals

const Modals = ({ isModalOpen, closeModal }) => {
  const email = localStorage.getItem('email');
  const [formData, setFormData] = useState({
    food_preference: '',
    date: '',
    location: { lat: '', lng: '' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/request/new-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        user_email: email,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Request submitted successfully!');
      setFormData({
        food_preference: '',
        date: '',
        location: { lat: '', lng: '' },
      });
      closeModal(); // Close modal after submission
    } else {
      console.error(data.message);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
    <ModalHeader>Submit a Request</ModalHeader>
    <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label>
            <span>Food Preference</span>
            <Input
              type="text"
              name="food_preference"
              value={formData.food_preference}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter your food preference"
              required
            />
          </Label>
        </div>

        <div className="mb-4">
          <Label>
            <span>Date</span>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1"
              required
            />
          </Label>
        </div>

        <div className="mb-4">
          <Label>
            <span>Latitude</span>
            <Input
              type="number"
              name="lat"
              value={formData.location.lat}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter latitude"
              required
            />
          </Label>
        </div>

        <div className="mb-4">
          <Label>
            <span>Longitude</span>
            <Input
              type="number"
              name="lng"
              value={formData.location.lng}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter longitude"
              required
            />
          </Label>
        </div>
      </form>
    </ModalBody>
    <ModalFooter>
      <Button layout="outline" onClick={closeModal}>Cancel</Button>
      <Button onClick={handleSubmit}>Submit Request</Button>
    </ModalFooter>
  </Modal>
  );
};

export default Modals;