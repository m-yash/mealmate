// import React, { useEffect, useState } from 'react';
// import { Table,
//     TableContainer, 
//     TableHeader, 
//     TableCell, 
//     TableBody, 
//     TableRow, 
//     TableFooter,
//     Avatar,
//     Badge,
//     Pagination,
//     Button, 
//     Modal, 
//     ModalHeader, 
//     ModalBody, 
//     ModalFooter } from '@windmill/react-ui';

// import PageTitle from '../uicomponents/Typography/PageTitle'
// import SectionTitle from '../uicomponents/Typography/SectionTitle'

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { ForbiddenIcon } from '../icons';

// import axios from 'axios';

// import RatingModal from './RatingModal'; 

// const BookingsPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       const response = await fetch('/booking/bookings', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const data = await response.json();
//       console.log(data); // Debugging: Check the response structure

//       if (data.success) {
//         setBookings(data.bookings);
//       } else {
//         setBookings([]); // Handle unsuccessful responses
//         toast.error(data.message || 'Failed to fetch bookings.');
//       }
//     };
//     fetchBookings();
//   }, []);

//   const openBookingModal = (booking) => {
//     setSelectedBooking(booking);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedBooking(null);
//     setIsModalOpen(false);
//   };

//   // rating
//   const handleOpenModal = (booking) => {
//     setSelectedBooking(booking);
//     setIsModalOpen(true);
// };

// const handleSubmitRating = async (ratingData) => {
//     try {
//         await axios.post('/api/reviews/submit', ratingData);
//         // Optionally refresh the bookings or handle UI updates
//     } catch (error) {
//         console.error('Error submitting rating:', error);
//     }
// };

//   return (

//     <div>
//       <ToastContainer />
//       <PageTitle>Meal Mates</PageTitle>
//       <SectionTitle>Your Upcoming Mates</SectionTitle>
//       <TableContainer>
//         <Table>
//           {bookings && bookings.length > 0 && (
//             <TableHeader>
//               <tr>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Food Request</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Phone</TableCell>
//                 <TableCell>Actions</TableCell>
//               </tr>
//             </TableHeader>
//           )}
//           <TableBody>
//             {bookings && bookings.length > 0 ? (
//               bookings.map((booking, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     {booking.user_id?.name || 'N/A'}
//                   </TableCell>
//                   <TableCell>
//                     <span
//                     style={{
//                       display: 'block',
//                       maxWidth: '700px', // Set a maximum width for the cell
//           overflowWrap: 'break-word', // Allows long words to break and wrap onto the next line
//           wordWrap: 'break-word', // Older browsers support
//           whiteSpace: 'normal', 
//                     }}
//                     title={booking.request_id?.food_preference}>
//                       {booking.request_id?.food_preference || 'N/A'}
//                       </span>
//                   </TableCell>
//                   <TableCell>
//                     {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
//                   </TableCell>
//                   <TableCell>
//                     {booking.user_id?.phone || booking.chef_id?.phone || 'N/A'}
//                   </TableCell>
//                   <TableCell>
//                     <Button layout="link" size="small" onClick={() => openBookingModal(booking)}>
//                       View Details
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan="5" className="text-center">
//                   <div className="flex flex-col items-center">
//                     <ForbiddenIcon className="w-12 h-12 mt-4 text-gray-400" aria-hidden="true" />
//                     <p className="text-gray-700 dark:text-gray-300 mt-2">
//                       No bookings available.
//                     </p>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {selectedBooking && (
//         <Modal isOpen={isModalOpen} onClose={closeModal}>
//           <ModalHeader>Booking Details</ModalHeader>
//           <ModalBody>
//             <h2 className="text-lg font-semibold">Requester Details</h2>
//             <p>Name: {selectedBooking.user_id?.name || 'N/A'}</p>
//             <p>Phone: {selectedBooking.user_id?.phone || 'N/A'}</p>

//             <h2 className="text-lg font-semibold mt-4">Chef Details</h2>
//             <p>Name: {selectedBooking.chef_id?.name || 'N/A'}</p>
//             < p>Phone: {selectedBooking.chef_id?.phone || 'N/A'}</p>

//             <h2 className="text-lg font-semibold mt-4">Food Request</h2>
//             <p>Meal: {selectedBooking.request_id?.food_preference || 'N/A'}</p>
//             <p>Date: {selectedBooking.date ? new Date(selectedBooking.date).toLocaleDateString() : 'N/A'}</p>
//             <p>Dietary Needs: {selectedBooking.request_id?.dietary_preference || 'None'}</p>
//             <p>Budget: ${selectedBooking.request_id?.budget || 'N/A'}</p>
//           </ModalBody>
//           <ModalFooter>
//             <Button layout="outline" onClick={closeModal}>
//               Close
//             </Button>
//           </ModalFooter>
//         </Modal>
//       )}
//     </div>
//         // <div>
//     //   <ToastContainer />
//     //   <PageTitle>Meal Mates</PageTitle>
//     //   <SectionTitle>Your Upcoming Mates</SectionTitle>
//     //   <TableContainer>
//     //     <Table>
//     //       <TableHeader>
//     //         <tr>
//     //           <TableCell>Name</TableCell>
//     //           <TableCell>Food Request</TableCell>
//     //           <TableCell>Date</TableCell>
//     //           <TableCell>Phone</TableCell>
//     //           <TableCell>Actions</TableCell>
//     //         </tr>
//     //       </TableHeader>
//     //         <TableBody>
//     //         {bookings && bookings.length > 0 ? (
//     //             bookings.map((booking, index) => (
//     //             <TableRow key={index} onClick={() => openBookingModal(booking)}>
//     //                 {/* Check if the current user is the chef or the requester */}
//     //                 <TableCell>
//     //                 {booking.user_id?.name || 'N/A'}
//     //                 </TableCell>
//     //                 <TableCell>
//     //                 {booking.request_id?.food_preference || 'N/A'}
//     //                 </TableCell>
//     //                 <TableCell>
//     //                 {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
//     //                 </TableCell>
//     //                 <TableCell>
//     //                 {/* Display phone number based on user's role in the booking */}
//     //                 {booking.user_id?.phone || booking.chef_id?.phone || 'N/A'}
//     //                 </TableCell>
//     //                 <TableCell>
//     //                 <Button layout="link" size="small" onClick={() => openBookingModal(booking)}>
//     //                     View Details
//     //                 </Button>
//     //                 </TableCell>
//     //             </TableRow>
//     //             ))
//     //         ) : (
//     //             <TableRow>
//     //             <TableCell colSpan="5">No bookings available.</TableCell>
//     //             </TableRow>
//     //         )}
//     //         </TableBody>
//     //     </Table>
//     //   </TableContainer>

//     //   {selectedBooking && (
//     //     <Modal isOpen={isModalOpen} onClose={closeModal}>
//     //       <ModalHeader>Booking Details</ModalHeader>
//     //       <ModalBody>
//     //         <h2 className="text-lg font-semibold">Requester Details</h2>
//     //         <p>Name: {selectedBooking.user_id?.name || 'N/A'}</p>
//     //         <p>Phone: {selectedBooking.user_id?.phone || 'N/A'}</p>

//     //         <h2 className="text-lg font-semibold mt-4">Chef Details</h2>
//     //         <p>Name: {selectedBooking.chef_id?.name || 'N/A'}</p>
//     //         <p>Phone: {selectedBooking.chef_id?.phone || 'N/A'}</p>

//     //         <h2 className="text-lg font-semibold mt-4">Food Request</h2>
//     //         <p>Meal: {selectedBooking.request_id?.food_preference || 'N/A'}</p>
//     //         <p>Date: {selectedBooking.date ? new Date(selectedBooking.date).toLocaleDateString() : 'N/A'}</p>
//     //         <p>Dietary Needs: {selectedBooking.request_id?.dietary_preference || 'None'}</p>
//     //         <p>Budget: ${selectedBooking.request_id?.budget || 'N/A'}</p>
//     //         </ModalBody>
//     //       {/* <ModalBody>
//     //         <h2 className="text-lg font-semibold">Requester Details</h2>
//     //         <p>Name: {selectedBooking.user_id.name}</p>
//     //         <p>Phone: {selectedBooking.user_id.phone}</p>

//     //         <h2 className="text-lg font-semibold mt-4">Chef Details</h2>
//     //         <p>Name: {selectedBooking.chef_id.name}</p>
//     //         <p>Phone: {selectedBooking.chef_id.phone}</p>

//     //         <h2 className="text-lg font-semibold mt-4">Food Request</h2>
//     //         <p>Meal: {selectedBooking.request_id.food_preference}</p>
//     //         <p>Date: {new Date(selectedBooking.date).toLocaleDateString()}</p>
//     //         <p>Dietary Needs: {selectedBooking.request_id.dietary_preference || 'None'}</p>
//     //         <p>Budget: ${selectedBooking.request_id.budget}</p>
//     //       </ModalBody> */}
//     //       <ModalFooter>
//     //         <Button layout="outline" onClick={closeModal}>
//     //           Close
//     //         </Button>
//     //       </ModalFooter>
//     //     </Modal>
//     //   )}
//     // </div>
//   );
// };

// export default BookingsPage;

// const a = "second last best";
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableContainer,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Badge,
     
} from '@windmill/react-ui';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ForbiddenIcon, HeartIcon, EditIcon, DetailsIcon, RateIcon } from '../icons';

import PageTitle from '../uicomponents/Typography/PageTitle'
import SectionTitle from '../uicomponents/Typography/SectionTitle'

import RatingModal from './RatingModal';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    // const [rating, setRating] = useState(0);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch('/booking/bookings', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();

            if (data.success) {
                setBookings(data.bookings);
            } else {
                setBookings([]);
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

    const handleOpenRatingModal = (booking) => {
      setSelectedBooking(booking);
      setIsRatingModalOpen(true);
  };
  const handleSubmitRating = async (ratingData) => {
    try {
        const response = await fetch('/booking/reviews/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(ratingData),
        });
        const data = await response.json();
        if (data.success) {
            toast.success('Rating submitted successfully!');
            // Optionally refresh bookings
        } else {
            toast.error(data.message || 'Failed to submit rating.');
        }
    } catch (error) {
        console.error('Error submitting rating:', error);
        toast.error('Server error.');
    }
};

    // const openRatingModal = (booking) => {
    //   if (!booking) {
    //     toast.error('Booking data is missing.');
    //     return;
    //   }
    //     setSelectedBooking(booking);
    //     setIsRatingModalOpen(true);
    // };

  //   const closeRatingModal = () => {
  //       setIsRatingModalOpen(false);
  //       setRating(0); // Reset rating
  //   };

  //   const handleSubmitRating = async () => {
  //     if (!selectedBooking || !selectedBooking.user_id || !selectedBooking.chef_id) {
  //       toast.error('Missing booking details for rating.');
  //       return;
  //   }

  //   try {
  //       await axios.post('/booking/submit-rating', {
  //           user_id: selectedBooking.user_id._id,
  //           chef_id: selectedBooking.chef_id._id,
  //           rating,
  //       });
  //       toast.success('Rating submitted successfully!');
  //       closeRatingModal();
  //   } catch (error) {
  //       console.error('Error submitting rating:', error);
  //       toast.error('Failed to submit rating.');
  //   }
  // };

//   useEffect(() => {
//     const fetchBookings = async () => {
//         try {
//             const response = await fetch('/booking/bookings', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const data = await response.json();

//             if (data.success) {
//                 console.log('Bookings fetched:', data.bookings); // Verify structure
//                 setBookings(data.bookings);
//             } else {
//                 toast.error(data.message || 'Failed to fetch bookings.');
//             }
//         } catch (error) {
//             console.error('Error fetching bookings:', error);
//             toast.error('Error fetching bookings.');
//         }
//     };
//     fetchBookings();
// }, []);


    return (
        <div>
            <ToastContainer />
            <PageTitle>Meal Mates</PageTitle>
            <SectionTitle>Your Upcoming Mates</SectionTitle>
            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            
                            <TableCell>Food Request</TableCell>
                            <TableCell>Date</TableCell>
                            
                            <TableCell>View / Rate</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {bookings.length > 0 ? (
                            bookings.map((booking, index) => (
                                <TableRow key={index}>
                                    
                                    <TableCell>{booking.request_id?.food_preference || 'N/A'}</TableCell>
                                    <TableCell>{booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button icon={DetailsIcon} aria-label="Like" size="small" onClick={() => openBookingModal(booking)}>
                                           
                                        </Button> 
                                        &nbsp;&nbsp;
                                        <Button icon={RateIcon} aria-label="Like" size="small" onClick={() => handleOpenRatingModal(booking)}>
                                           
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

            {/* Booking Details Modal */}
            {selectedBooking && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalHeader> Booking Details</ModalHeader>
                    <ModalBody>
                        <h2 className="text-lg font-semibold">Requester Details</h2>
                        <p>Name: {selectedBooking.user_id?.name || 'N/A'}</p>
                        <p>Phone: {selectedBooking.user_id?.phone || 'N/A'}</p>

                        <h2 className="text-lg font-semibold mt-4">Chef Details</h2>
                        <p>Name: {selectedBooking.chef_id?.name || 'N/A'}</p>
                        <p>Phone: {selectedBooking.chef_id?.phone || 'N/A'}</p>

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

            {/* Rating Modal */}
            {selectedBooking && (
                <RatingModal
                    isOpen={isRatingModalOpen}
                    onClose={() => setIsRatingModalOpen(false)}
                    onSubmit={handleSubmitRating}
                    booking={selectedBooking}
                />
            )}
            {/* <Modal isOpen={isRatingModalOpen} onClose={closeRatingModal}>
                <ModalHeader>Rate the Chef</ModalHeader>
                <ModalBody>
                    <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                style={{
                                  color: star <= rating ? '#793deb' : '#D1D5DB', // Use inline styles here
                                  fontSize: '2rem', // Set font size directly
                              }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button layout="outline" onClick={closeRatingModal}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitRating} disabled={rating === 0}>
                        Submit Rating
                    </Button>
                </ModalFooter>
            </Modal> */}
        </div>
    );
};

export default BookingsPage;

// import React, { useEffect, useState } from 'react';
// import { Table, TableContainer, TableHeader, TableCell, TableBody, TableRow, Button } from '@windmill/react-ui';
// import RatingModal from './RatingModal';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PageTitle from '../uicomponents/Typography/PageTitle'
// import SectionTitle from '../uicomponents/Typography/SectionTitle'

// const BookingsPage = () => {
//     const [bookings, setBookings] = useState([]);
//     const [selectedBooking, setSelectedBooking] = useState(null);
//     const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const response = await fetch('/booking/bookings', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 const data = await response.json();
//                 if (data.success) {
//                     setBookings(data.bookings);
//                 } else {
//                     toast.error(data.message || 'Failed to fetch bookings.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching bookings:', error);
//                 toast.error('Server error.');
//             }
//         };
//         fetchBookings();
//     }, []);

//     const handleOpenRatingModal = (booking) => {
//         setSelectedBooking(booking);
//         setIsRatingModalOpen(true);
//     };

//     const handleSubmitRating = async (ratingData) => {
//         try {
//             const response = await fetch('/booking/reviews/submit', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify(ratingData),
//             });
//             const data = await response.json();
//             if (data.success) {
//                 toast.success('Rating submitted successfully!');
//                 // Optionally refresh bookings
//             } else {
//                 toast.error(data.message || 'Failed to submit rating.');
//             }
//         } catch (error) {
//             console.error('Error submitting rating:', error);
//             toast.error('Server error.');
//         }
//     };

//     return (
//         <div>
//             <ToastContainer />
//             <PageTitle>Meal Mates</PageTitle>
//             <SectionTitle>Your Upcoming Mates</SectionTitle>
//             <TableContainer>
//                 <Table>
//                     <TableHeader>
//                         <tr>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Food Request</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </tr>
//                     </TableHeader>
//                     <TableBody>
//                         {bookings.map((booking) => (
//                             <TableRow key={booking._id}>
//                                 <TableCell>{booking.user_id?.name || 'N/A'}</TableCell>
//                                 <TableCell>{booking.request_id?.food_preference || 'N/A'}</TableCell>
//                                 <TableCell>
//                                     {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button onClick={() => handleOpenRatingModal(booking)}>Rate</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
            
//             {selectedBooking && (
//                 <RatingModal
//                     isOpen={isRatingModalOpen}
//                     onClose={() => setIsRatingModalOpen(false)}
//                     onSubmit={handleSubmitRating}
//                     booking={selectedBooking}
//                 />
//             )}
//         </div>
//     );
// };

// export default BookingsPage;
