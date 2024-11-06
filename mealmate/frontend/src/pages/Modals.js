import React, { useState } from 'react'

import PageTitle from '../uicomponents/Typography/PageTitle'
import CTA from '../uicomponents/CTA'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from '@windmill/react-ui'


const Modals = ({ isModalOpen, closeModal }) => {
  const email = localStorage.getItem('email');
  const [formData, setFormData] = useState({
    food_preference: '',
    date: '',
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
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
            <span>What meal do you want?</span>
            <Input
              type="text"
              name="food_preference"
              value={formData.food_preference}
              onChange={handleChange}
              className="mt-1"
              placeholder="Provide some details about what a chef should make for you"
              required
            />
          </Label>
        </div>

        <div className="mb-4">
          <Label>
            <span>When do you want your meal by?</span>
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