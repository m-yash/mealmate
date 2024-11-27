import React, { useEffect, useState } from 'react';
import { Table,
    TableContainer, 
    TableHeader, 
    TableCell, 
    TableBody, 
    TableRow, 
    TableFooter,
    Avatar,
    Badge,
    Pagination,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter } from '@windmill/react-ui';

import PageTitle from '../uicomponents/Typography/PageTitle'
import SectionTitle from '../uicomponents/Typography/SectionTitle'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ForbiddenIcon } from '../icons';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch('/booking/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log(data); // Debugging: Check the response structure

      if (data.success) {
        setBookings(data.bookings);
      } else {
        setBookings([]); // Handle unsuccessful responses
        toast.error(data.message || 'Failed to fetch bookings.');
      }
    };
    fetchBookings();
  }, []);

  const openBookingModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  return (

    <div>
      <ToastContainer />
      <PageTitle>Meal Mates</PageTitle>
      <SectionTitle>Your Upcoming Mates</SectionTitle>
      <TableContainer>
        <Table>
          {bookings && bookings.length > 0 && (
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Food Request</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
          )}
          <TableBody>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {booking.user_id?.name || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <span
                    style={{
                      display: 'block',
                      maxWidth: '700px', // Set a maximum width for the cell
          overflowWrap: 'break-word', // Allows long words to break and wrap onto the next line
          wordWrap: 'break-word', // Older browsers support
          whiteSpace: 'normal', 
                    }}
                    title={booking.request_id?.food_preference}>
                      {booking.request_id?.food_preference || 'N/A'}
                      </span>
                  </TableCell>
                  <TableCell>
                    {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {booking.user_id?.phone || booking.chef_id?.phone || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button layout="link" size="small" onClick={() => openBookingModal(booking)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  <div className="flex flex-col items-center">
                    <ForbiddenIcon className="w-12 h-12 mt-4 text-gray-400" aria-hidden="true" />
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      No bookings available.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedBooking && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Booking Details</ModalHeader>
          <ModalBody>
            <h2 className="text-lg font-semibold">Requester Details</h2>
            <p>Name: {selectedBooking.user_id?.name || 'N/A'}</p>
            <p>Phone: {selectedBooking.user_id?.phone || 'N/A'}</p>

            <h2 className="text-lg font-semibold mt-4">Chef Details</h2>
            <p>Name: {selectedBooking.chef_id?.name || 'N/A'}</p>
            < p>Phone: {selectedBooking.chef_id?.phone || 'N/A'}</p>

            <h2 className="text-lg font-semibold mt-4">Food Request</h2>
            <p>Meal: {selectedBooking.request_id?.food_preference || 'N/A'}</p>
            <p>Date: {selectedBooking.date ? new Date(selectedBooking.date).toLocaleDateString() : 'N/A'}</p>
            <p>Dietary Needs: {selectedBooking.request_id?.dietary_preference || 'None'}</p>
            <p>Budget: ${selectedBooking.request_id?.budget || 'N/A'}</p>
          </ModalBody>
          <ModalFooter>
            <Button layout="outline" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
        // <div>
    //   <ToastContainer />
    //   <PageTitle>Meal Mates</PageTitle>
    //   <SectionTitle>Your Upcoming Mates</SectionTitle>
    //   <TableContainer>
    //     <Table>
    //       <TableHeader>
    //         <tr>
    //           <TableCell>Name</TableCell>
    //           <TableCell>Food Request</TableCell>
    //           <TableCell>Date</TableCell>
    //           <TableCell>Phone</TableCell>
    //           <TableCell>Actions</TableCell>
    //         </tr>
    //       </TableHeader>
    //         <TableBody>
    //         {bookings && bookings.length > 0 ? (
    //             bookings.map((booking, index) => (
    //             <TableRow key={index} onClick={() => openBookingModal(booking)}>
    //                 {/* Check if the current user is the chef or the requester */}
    //                 <TableCell>
    //                 {booking.user_id?.name || 'N/A'}
    //                 </TableCell>
    //                 <TableCell>
    //                 {booking.request_id?.food_preference || 'N/A'}
    //                 </TableCell>
    //                 <TableCell>
    //                 {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
    //                 </TableCell>
    //                 <TableCell>
    //                 {/* Display phone number based on user's role in the booking */}
    //                 {booking.user_id?.phone || booking.chef_id?.phone || 'N/A'}
    //                 </TableCell>
    //                 <TableCell>
    //                 <Button layout="link" size="small" onClick={() => openBookingModal(booking)}>
    //                     View Details
    //                 </Button>
    //                 </TableCell>
    //             </TableRow>
    //             ))
    //         ) : (
    //             <TableRow>
    //             <TableCell colSpan="5">No bookings available.</TableCell>
    //             </TableRow>
    //         )}
    //         </TableBody>
    //     </Table>
    //   </TableContainer>

    //   {selectedBooking && (
    //     <Modal isOpen={isModalOpen} onClose={closeModal}>
    //       <ModalHeader>Booking Details</ModalHeader>
    //       <ModalBody>
    //         <h2 className="text-lg font-semibold">Requester Details</h2>
    //         <p>Name: {selectedBooking.user_id?.name || 'N/A'}</p>
    //         <p>Phone: {selectedBooking.user_id?.phone || 'N/A'}</p>

    //         <h2 className="text-lg font-semibold mt-4">Chef Details</h2>
    //         <p>Name: {selectedBooking.chef_id?.name || 'N/A'}</p>
    //         <p>Phone: {selectedBooking.chef_id?.phone || 'N/A'}</p>

    //         <h2 className="text-lg font-semibold mt-4">Food Request</h2>
    //         <p>Meal: {selectedBooking.request_id?.food_preference || 'N/A'}</p>
    //         <p>Date: {selectedBooking.date ? new Date(selectedBooking.date).toLocaleDateString() : 'N/A'}</p>
    //         <p>Dietary Needs: {selectedBooking.request_id?.dietary_preference || 'None'}</p>
    //         <p>Budget: ${selectedBooking.request_id?.budget || 'N/A'}</p>
    //         </ModalBody>
    //       {/* <ModalBody>
    //         <h2 className="text-lg font-semibold">Requester Details</h2>
    //         <p>Name: {selectedBooking.user_id.name}</p>
    //         <p>Phone: {selectedBooking.user_id.phone}</p>

    //         <h2 className="text-lg font-semibold mt-4">Chef Details</h2>
    //         <p>Name: {selectedBooking.chef_id.name}</p>
    //         <p>Phone: {selectedBooking.chef_id.phone}</p>

    //         <h2 className="text-lg font-semibold mt-4">Food Request</h2>
    //         <p>Meal: {selectedBooking.request_id.food_preference}</p>
    //         <p>Date: {new Date(selectedBooking.date).toLocaleDateString()}</p>
    //         <p>Dietary Needs: {selectedBooking.request_id.dietary_preference || 'None'}</p>
    //         <p>Budget: ${selectedBooking.request_id.budget}</p>
    //       </ModalBody> */}
    //       <ModalFooter>
    //         <Button layout="outline" onClick={closeModal}>
    //           Close
    //         </Button>
    //       </ModalFooter>
    //     </Modal>
    //   )}
    // </div>
  );
};

export default BookingsPage;
