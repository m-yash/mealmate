
import React, { useState, useEffect } from 'react'

import CTA from '../uicomponents/CTA'
import InfoCard from '../uicomponents/Cards/InfoCard'
import ChartCard from '../uicomponents/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../uicomponents/Chart/ChartLegend'
import PageTitle from '../uicomponents/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../uicomponents/RoundIcon'
import response from '../utils/demo/tableData'

import SectionTitle from '../uicomponents/Typography/SectionTitle'

import { ForbiddenIcon } from '../icons';

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Button,
  Badge,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'

import { EditIcon, TrashIcon, AcceptIcon } from '../icons'

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 8;

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const fetchRequests = async () => {
    try {
      const email = localStorage.getItem('email');
      const response = await fetch(`/request/all-request?email=${email}`);
      const requests = await response.json();
      setData(requests);
      setTotalResults(requests.length);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onPageChange = (p) => setPage(p);

  const handleAppeal = async (requestId) => {
    setSelectedRequestId(requestId);
    setIsCommentModalOpen(true);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      const chefId = localStorage.getItem('user_id');
      await axios.post('http://localhost:5000/responses/appeal', {
        request_id: selectedRequestId,
        chef_id: chefId,
        comments: comment,
      });
      toast.success('Request appealed successfully!');
      setComment('');
      setIsCommentModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error appealing the request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      const chefId = localStorage.getItem('user_id');
      const response = await fetch(`/responses/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: requestId, chef_id: chefId }),
      });
      if (!response.ok) {
        toast.error('Failed to reject request');
        return;
      }
      toast.success('Request rejected successfully!');
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error('Error rejecting the request');
    }
  };

  return (
    <>
      <ToastContainer />
      <PageTitle>Requests</PageTitle>
      <SectionTitle>Available Requests Near You</SectionTitle>
      <TableContainer className="mb-8">
        {data.length === 0 ? (
          <div className="flex flex-col items-center">
            <ForbiddenIcon className="w-12 h-12 mt-4 text-gray-400" aria-hidden="true" />
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              No requests available near you at this time.
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Food Request</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Preference</TableCell>
                  <TableCell>Willing to pay (USD)</TableCell>
                  <TableCell>Actions</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data.slice((page - 1) * resultsPerPage, page * resultsPerPage).map((request, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">
                        {request.user_id ? request.user_id.name : 'Unknown User'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm"
                      style={{
                        display: 'block',
                        maxWidth: '700px',
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        whiteSpace: 'normal',
                      }}
                      title={request.food_preference}
                      >{request.food_preference}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(request.date).toLocaleDateString('en-GB', { timeZone: 'UTC' })} at {request.time}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {request.dietary_preference && (
                          <Badge type={request.dietary_preference === 'Non-Vegetarian' ? 'danger' : 'success'}>
                            {request.dietary_preference}
                          </Badge>
                        )}
                        {request.allergies && request.allergies.length > 0 && request.allergies.map((allergy, index) => (
                          <Badge key={index} type="warning">{allergy.replace(/_/g, '')}</Badge>
                        ))}
                        {request.spice_level && (
                          <Badge type="neutral">{request.spice_level}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">${request.budget || ' N/A'}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="icon" aria-label="Appeal" onClick={() => handleAppeal(request._id)}>
                          <AcceptIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={onPageChange}
                label="Table navigation"
              />
            </TableFooter>
          </>
        )}
      </TableContainer>

      <Modal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)}>
        <ModalHeader>Add Comments</ModalHeader>
        <ModalBody>
          <Textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Comments can improve your chances of getting selected"
            rows={4}
          />
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={() => setIsCommentModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitComment}>Submit</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Dashboard;


// function Dashboard() { 
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [totalResults, setTotalResults] = useState(0);
//   const resultsPerPage = 8;

//   const fetchRequests = async () => {
//     try {
//       const email = localStorage.getItem('email');
//       const response = await fetch(`/request/all-request?email=${email}`);
//       const requests = await response.json();
    
//       setData(requests);
//       setTotalResults(requests.length);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const onPageChange = (p) => setPage(p);

//   const handleAppeal = async (requestId) => {
//     try {
//       const chefId = localStorage.getItem('user_id');
//       await axios.post('http://localhost:5000/responses/appeal', {
//         request_id: requestId,
//         chef_id: chefId,
//       });
//       toast.success('Request appealed successfully!');
//     } catch (error) {
//       toast.info(error.response?.data?.message || 'Error appealing the request');
//     }
//   };

//   const handleReject = async (requestId) => {
//     try {
//       const chefId = localStorage.getItem('user_id');
//       const response = await fetch(`/responses/reject`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ request_id: requestId, chef_id: chefId }),
//       });
//       if (!response.ok) {
//         toast.error('Failed to reject request');
//         return;
//       }
//       toast.success('Request rejected successfully!');
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//       toast.error('Error rejecting the request');
//     }
//   };

//   return (
//     <>
    
//       <ToastContainer />
//       <PageTitle>Requests</PageTitle>
//       <SectionTitle>Available Requests Near You</SectionTitle>
//       <TableContainer className="mb-8">
//         {data.length === 0 ? (
//           <div className="flex flex-col items-center">
//             <ForbiddenIcon className="w-12 h-12 mt-4 text-gray-400" aria-hidden="true" />
//             <p className="text-gray-700 dark:text-gray-300 mt-2">
//               No requests available near you at this time.
//             </p>
//           </div>
//         ) : (
//           <>
//             <Table>
//               <TableHeader>
//                 <tr>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Food Request</TableCell>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Preference</TableCell>
//                   <TableCell>Willing to pay (USD)</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </tr>
//               </TableHeader>
//               <TableBody>
//                 {data.slice((page - 1) * resultsPerPage, page * resultsPerPage).map((request, i) => (
//                   <TableRow key={i}>
//                     <TableCell>
//                       <span className="text-sm">
//                         {request.user_id ? request.user_id.name : 'Unknown User'}
//                       </span>
//                     </TableCell>
//                     <TableCell>
//                       <span className="text-sm"
//                       style={{
//                         display: 'block',
//                         maxWidth: '700px', // Set a maximum width for the cell
//             overflowWrap: 'break-word', // Allows long words to break and wrap onto the next line
//             wordWrap: 'break-word', // Older browsers support
//             whiteSpace: 'normal', 
//                       }}
//                       title={request.food_preference}
//                       >{request.food_preference}</span>
//                     </TableCell>
//                     <TableCell>
//                       <span className="text-sm">
//                         {new Date(request.date).toLocaleDateString('en-GB', { timeZone: 'UTC' })} at {request.time}
//                       </span>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex flex-wrap gap-2">
//                         {request.dietary_preference && (
//                           <Badge type={request.dietary_preference === 'Non-Vegetarian' ? 'danger' : 'success'}>
//                             {request.dietary_preference}
//                           </Badge>
//                         )}
//                         {request.allergies && request.allergies.length > 0 && request.allergies.map((allergy, index) => (
//                           <Badge key={index} type="warning">{allergy.replace(/_/g, '')}</Badge>
//                         ))}
//                         {request.spice_level && (
//                           <Badge type="neutral">{request.spice_level}</Badge>
//                         )}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <span className="text-sm">${request.budget || ' N/A'}</span>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center space-x-4">
//                         <Button layout="link" size="icon" aria-label="Appeal" onClick={() => handleAppeal(request._id)}>
//                           <AcceptIcon className="w-5 h-5" aria-hidden="true" />
//                         </Button>
                
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <TableFooter>
//               <Pagination
//                 totalResults={totalResults}
//                 resultsPerPage={resultsPerPage}
//                 onChange={onPageChange}
//                 label="Table navigation"
//               />
//             </TableFooter>
//           </>
//         )}
//       </TableContainer>
//     </>
//   );
// }
 

// export default Dashboard;

// function Dashboard() { 
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [totalResults, setTotalResults] = useState(0);
//   const resultsPerPage = 10; 

//   // function to fetch location (Lat and Long) of the user logged-in
//   // const fetchUserLocation = async () => {
//   //   try {
//   //     const email = localStorage.getItem('email');
//   //     const userResponse = await fetch(`http://localhost:5000/user/location?email=${email}`);
//   //     const userData = await userResponse.json();
//   //     return { lat: userData.location.lat, lng: userData.location.lng };
//   //   } catch (error) {
//   //     console.error("Error fetching user location:", error);
//   //     return null;
//   //   }
//   // };

//   // const fetchRequests = async () => {
//   //   try {

//   //     const userLocation = await fetchUserLocation();
//   //     if (!userLocation) return;

//   //     const { lat, lng } = userLocation;

//   //     const response = await fetch(`http://localhost:5000/request/all-request?lat=${lat}&lng=${lng}`);
//   //     const requests = await response.json();
//   //     // previous implementation to show all requests into the Available request in dashboard 
//   //     // const response = await fetch('/request/all-request');
//   //     // const requests = await response.json();
//   //     setData(requests);
//   //     setTotalResults(requests.length);
//   //   } catch (error) {
//   //     console.error("Error fetching requests:", error);
//   //   }
//   // };

//   const fetchRequests = async () => {
//     try {
//       const email = localStorage.getItem('email');
//       const response = await fetch(`/request/all-request?email=${email}`);
//       const requests = await response.json();
//       setData(requests);
//       setTotalResults(requests.length);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     }
//   };
//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const onPageChange = (p) => setPage(p);

//   // New functions to handle appeal and reject actions
// const handleAppeal = async (requestId) => {
//   try {
//     const chefId = localStorage.getItem('user_id'); // Assuming chef ID is stored in localStorage
//     const response = await axios.post('http://localhost:5000/responses/appeal', {
//       request_id: requestId,
//       chef_id: chefId,
//     });

//     toast.success('Request appealed successfully!'); // Display success message using toast
//     // toast.success('Request appealed successfully!' + response.data.message); // Display success message using toast
//   } catch (error) {
//     toast.error(error.response?.data?.message || 'Error appealing the request'); // Display error message using toast
//   }
// };

// const handleReject = async (requestId) => {
//   try {
//     const chefId = localStorage.getItem('user_id');
//     const response = await fetch(`/responses/reject`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ request_id: requestId, chef_id: chefId }),
//     });
//     if (!response.ok) {
//       toast.error('Failed to reject request'); // Show error toast if the response is not ok
//       return;
//     }
//     toast.success('Request rejected successfully!'); // Show success toast
//   } catch (error) {
//     console.error("Error rejecting request:", error);
//       toast.error('Error rejecting the request'); // Show error toast
//   }
// };

//   return (
//     <>
//     <ToastContainer />
//       <PageTitle>Dashboard</PageTitle>
//       <SectionTitle>Available Requests</SectionTitle>
//       <TableContainer className="mb-8">
//         <Table>
//           <TableHeader>
//             <tr>
//               <TableCell>User</TableCell>
//               <TableCell>Food Preference</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </tr>
//           </TableHeader>
//           <TableBody>
//             {data.slice((page - 1) * resultsPerPage, page * resultsPerPage).map((request, i) => (
//               <TableRow key={i}>
//                 <TableCell>
//                   <span className="text-sm">
                    
//                     {request.user_id ? request.user_id.name : 'Unknown User'}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">
//                     {request.food_preference}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">
//                     {new Date(request.date).toLocaleDateString()}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <Badge type={request.status === 'fulfilled' ? 'success' : request.status === 'cancelled' ? 'danger' : 'warning'}>
//                     {request.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center space-x-4">
//                     <Button layout="link" size="icon" aria-label="Appeal" onClick={() => handleAppeal(request._id)}>
//                       <EditIcon className="w-5 h-5" aria-hidden="true" />
//                     </Button>
//                     <Button layout="link" size="icon" aria-label="Reject" onClick={() => handleReject(request._id)}>
//                       <TrashIcon className="w-5 h-5" aria-hidden="true" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TableFooter>
//           <Pagination
//             totalResults={totalResults}
//             resultsPerPage={resultsPerPage}
//             onChange={onPageChange}
//             label="Table navigation"
//           />
//         </TableFooter>
//       </TableContainer>
//     </>
//   );
// }

// export default Dashboard
