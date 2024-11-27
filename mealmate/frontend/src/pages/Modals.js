import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Textarea, Button, Input, Label, Select } from '@windmill/react-ui';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Modals = ({ isModalOpen, closeModal }) => {
  const email = localStorage.getItem('email');
  const [formData, setFormData] = useState({
    food_preference: '',
    date: '',
    time: '',
    dietary_preference: '',
    allergies: [],
    spice_level: '',
    budget: ''
  });

  // Get today's date and the date 7 days from now
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  // Format the dates to 'YYYY-MM-DD'
  const formattedToday = today.toISOString().split('T')[0];
  const formattedMaxDate = maxDate.toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox' && name === 'allergies') {
      setFormData((prev) => {
        const newAllergies = checked
          ? [...(prev.allergies || []), value]
          : prev.allergies.filter((allergy) => allergy !== value);
        return { ...prev, allergies: newAllergies };
      });
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
        dietary_preference: formData.dietary_preference || null, // If empty, send null
        spice_level: formData.spice_level || null,
        user_email: email,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Food request submitted successfully!");
      setFormData({
        food_preference: '',
        date: '',
        time: '',
        dietary_preference: '',
        allergies: [],
        spice_level: '',
        budget: ''
      });
      closeModal();
    } else {
      toast.error("Failed to submit food request");
      console.error(data.message);
    }
  };


  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>Submit a Meal Request</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          {/* Food Preference */}
          <div className="mb-4">
            <Label>
              <span>Meal?</span>
              <Textarea
                rows="3"
                name="food_preference"
                value={formData.food_preference}
                onChange={handleChange}
                className="mt-1"
                placeholder="Please provide details for the meal."
                required
              />
            </Label>
          </div>

          {/* Date and Time */}
          <div className="mb-4 flex">
            {/* Date Field */}
            <div className="mr-4 flex-1"> {/* Add margin-right for spacing */}
              <Label>
                <span>When do you want your meal?</span>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1"
                  required
                  min={formattedToday}  // Set minimum date
                  max={formattedMaxDate} // Set maximum date
                />
              </Label>
            </div>
            
            {/* Time Field */}
            <div className="flex-1"> {/* Flex-grow to take available space */}
              <Label>
                <span>Please specify time</span>
                <Input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </Label>
            </div>
          </div>
          {/* Date */}
          {/* <div className="mb-4">
            <Label>
              <span>When do you want your meal?</span>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1"
                required
                min={formattedToday}  // Set minimum date
                max={formattedMaxDate} // Set maximum date
              />
            </Label>
          </div> */}
          
          {/* Time */}
          {/* <div className="mb-4">
            <Label>
              <span>Time</span>
              <Input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </Label>
          </div> */}

          {/* Dietary Preference and Spice Level */}
          <div className="mb-4 flex">
            {/* Dietary Preference Field */}
            <div className="mr-4 flex-1"> {/* Add margin-right for spacing */}
              <Label>
                <span>Dietary Preference (optional)</span>
                <Select
                  name="dietary_preference"
                  value={formData.dietary_preference}
                  onChange={handleChange}
                  className="mt-1"
                >
                  <option value="">Select...</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </Select>
              </Label>
            </div>
            
            {/* Spice Level Field */}
            <div className="flex-1"> {/* Flex-grow to take available space */}
              <Label>
                <span>Spice Level (optional)</span>
                <Select
                  name="spice_level"
                  value={formData.spice_level}
                  onChange={handleChange}
                  className="mt-1"
                >
                  <option value="">Select...</option>
                  <option value="Mild Spicy">Mild</option>
                  <option value="Medium Spicy">Medium</option>
                  <option value="Extreme Spicy">Extreme</option>
                </Select>
              </Label>
            </div>
          </div>

          {/* Allergies */}
          <div className="mb-4">
            <Label>
              <span>Allergies/Intolerances (optional)</span>
              <div className="mt-2">
                <Label check>
                <Input
                  type="checkbox"
                  name="allergies"
                  value="gluten_free"
                  checked={formData.allergies?.includes("gluten_free") || false}
                  onChange={handleChange}
                />
                  <span className="ml-2">Gluten-Free</span>
                </Label>
                <Label check className="ml-4">
                <Input
                  type="checkbox"
                  name="allergies"
                  value="dairy_free"
                  checked={formData.allergies?.includes("dairy_free") || false}
                  onChange={handleChange}
                />
                  <span className="ml-2">Dairy-Free</span>
                </Label>
                <Label check className="ml-4">
                <Input
                  type="checkbox"
                  name="allergies"
                  value="nut_free"
                  checked={formData.allergies?.includes("nut_free") || false}
                  onChange={handleChange}
                />
                  <span className="ml-2">Nut-Free</span>
                </Label>
                <Label check className="ml-4">
                <Input
                  type="checkbox"
                  name="allergies"
                  value="soy_free"
                  checked={formData.allergies?.includes("soy_free") || false}
                  onChange={handleChange}
                />
                  <span className="ml-2">Soy-Free</span>
                </Label>
                {/* Add more allergies as needed */}
              </div>
            </Label>
          </div>


          {/* Budget */}
          <div className="mb-4">
            <Label>
              <span>How much are you willing to spend?</span>
              <Input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="mt-1"
                placeholder="Specify your budget in CAD"
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

// import React, { useState } from 'react'

// import PageTitle from '../uicomponents/Typography/PageTitle'
// import CTA from '../uicomponents/CTA'
// import { Modal, ModalHeader, ModalBody, ModalFooter, Textarea, Button, Input, Label } from '@windmill/react-ui'

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Modals = ({ isModalOpen, closeModal }) => {
//   const email = localStorage.getItem('email');
//   const [formData, setFormData] = useState({
//     food_preference: '',
//     date: '',
  
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch('/request/new-request', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         ...formData,
//         user_email: email,
//       }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       toast.success("Food request submitted successfuly");
//       // alert('Request submitted successfully!');
//       setFormData({
//         food_preference: '',
//         date: '',
//       });
//       closeModal(); // Close modal after submission
//     } else {
//       toast.error("Failed submitting food request");
//       console.error(data.message);
//     }
//   };

//   return (
//     <Modal isOpen={isModalOpen} onClose={closeModal}>
//     <ModalHeader>Submit a meal request</ModalHeader>
//     <ModalBody>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <Label>
//             <span>Meal?</span>
//             <Textarea
//             rows="3"
//               name="food_preference"
//               value={formData.food_preference}
//               onChange={handleChange}
//               className="mt-1"
//               placeholder="Please provide details for the meal that the mealmate should know"
//               required
//             />
//           </Label>
//         </div>

//         <div className="mb-4">
//           <Label>
//             <span>When do you want your meal on?</span>
//             <Input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="mt-1"
//               required
//             />
//           </Label>
//         </div>

      
//       </form>
//     </ModalBody>
//     <ModalFooter>
//       <Button layout="outline" onClick={closeModal}>Cancel</Button>
//       <Button onClick={handleSubmit}>Submit Request</Button>
//     </ModalFooter>
//   </Modal>
//   );
// };

// export default Modals;