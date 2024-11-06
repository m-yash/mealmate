import React, { useEffect, useState } from 'react';
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
} from '@windmill/react-ui'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PageTitle from '../uicomponents/Typography/PageTitle'
import SectionTitle from '../uicomponents/Typography/SectionTitle'

const RequestsWithAppeals = () => {
  const [appeals, setAppeals] = useState({});
  const [paginationState, setPaginationState] = useState({});
  const resultsPerPage = 5; // Number of rows per table page

  const fetchAppeals = async () => {
    const userId = localStorage.getItem('user_id');
    try {
      const response = await fetch(`/responses/fetch-appeals/${userId}`);
      const appealsData = await response.json();

      // Group appeals by request ID
      const appealsGrouped = appealsData.reduce((acc, appeal) => {
        const requestId = appeal.request_id._id;
        if (!acc[requestId]) acc[requestId] = [];
        acc[requestId].push(appeal);
        return acc;
      }, {});

      // Initialize pagination state for each request if not already set
      const initialPaginationState = Object.keys(appealsGrouped).reduce((acc, requestId) => {
        if (!acc[requestId]) {
          acc[requestId] = {
            page: 1,
            totalResults: appealsGrouped[requestId].length,
          };
        }
        return acc;
      }, paginationState);

      setAppeals(appealsGrouped);
      setPaginationState(initialPaginationState);
    } catch (error) {
      console.error("Error fetching appeals:", error);
    }
  };

  useEffect(() => {
    let isMounted = true; // Track whether component is mounted

    if (isMounted) fetchAppeals();

    return () => {
      isMounted = false; // Cleanup function to prevent updates if unmounted
    };
  }, []);

  const handleResponse = async (responseId, status) => {
    const endpoint = status === 'accept' ? '/responses/accept' : '/responses/reject';
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response_id: responseId }),
      });
  
      const message = await response.text();
      toast.success(message);
  
      // Re-fetch appeals to update the UI
      fetchAppeals();
    } catch (error) {
      toast.error("Error processing response");
    }
  };

  // handle response to implement acceptance of appeal by user
  // const handleResponse = async (responseId, status, requestId, chefId) => {
  //   try {
  //     if (status === 'accept') {
  //       // If status is 'accept', create a new booking
  //       const response = await fetch('/responses/accept', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           response_id: responseId,
  //           request_id: requestId,
  //           chef_id: chefId,
  //         }),
  //       });
  //       const message = await response.text();
  //       toast.success(message);
  //     } else {
  //       // If status is 'reject', reject the appeal without creating a booking
  //       const response = await fetch('/responses/reject', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ response_id: responseId }),
  //       });
  //       const message = await response.text();
  //       toast.success(message);
  //     }
  
  //     // Fetch updated appeals after accepting/rejecting
  //     fetchAppeals();
  //   } catch (error) {
  //     toast.error("Error processing response");
  //   }
  // };
  

  // working handle response as of now
  // const handleResponse = async (responseId, status) => {
  //   try {
  //     const response = await fetch(`/responses/${status}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ response_id: responseId }),
  //     });
  //     const message = await response.text();
  //     toast.success(message);
  //     fetchAppeals();
  //   } catch (error) {
  //     toast.error("Error processing response");
  //   }
  // };

  const onPageChange = (requestId, page) => {
    setPaginationState((prevState) => ({
      ...prevState,
      [requestId]: {
        ...prevState[requestId],
        page,
      },
    }));
  };

  return (
    <div>
      <ToastContainer />
      <PageTitle>Chef Appeals for Your Requests</PageTitle>
      {Object.keys(appeals).map((requestId) => {
        // Ensure pagination state is initialized
        const pagination = paginationState[requestId] || { page: 1, totalResults: 0 };
        const currentPageData = appeals[requestId].slice(
          (pagination.page - 1) * resultsPerPage,
          pagination.page * resultsPerPage
        );

        return (
          <div key={requestId} className="mb-6">
            <SectionTitle>
              Request for {appeals[requestId][0].request_id.food_preference} on {new Date(appeals[requestId][0].request_id.date).toLocaleDateString()}
            </SectionTitle>
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>Chef</TableCell>
                    <TableCell>Response Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {currentPageData.map((appeal) => (
                    <TableRow key={appeal._id}>
                      <TableCell>
                        <span className="text-sm">
                          {appeal.chef_id.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {appeal.response_status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleResponse(appeal._id, 'accept')}>Accept</Button>
                        <Button onClick={() => handleResponse(appeal._id, 'reject')} layout="link">Reject</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={pagination.totalResults}
                  resultsPerPage={resultsPerPage}
                  onChange={(p) => onPageChange(requestId, p)}
                  label={`Pagination for ${requestId}`}
                />
              </TableFooter>
            </TableContainer>
          </div>
        );
      })}
    </div>
  );
};
export default RequestsWithAppeals;

// const RequestsWithAppeals = () => {
//   const [appeals, setAppeals] = useState({});

//   // Define fetchAppeals function outside of useEffect
//   const fetchAppeals = async () => {
//     const userId = localStorage.getItem('user_id');
//     try {
//       const response = await fetch(`/responses/fetch-appeals/${userId}`);
//       const appealsData = await response.json();

//       // Group appeals by request ID
//       const appealsGrouped = appealsData.reduce((acc, appeal) => {
//         const requestId = appeal.request_id._id;
//         if (!acc[requestId]) acc[requestId] = [];
//         acc[requestId].push(appeal);
//         return acc;
//       }, {});

//       setAppeals(appealsGrouped);
//     } catch (error) {
//       console.error("Error fetching appeals:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAppeals();
//   }, []);

//   const handleResponse = async (responseId, status) => {
//     try {
//       const response = await fetch(`/responses/${status}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ response_id: responseId }),
//       });
//       const message = await response.text();
//       toast.success(message);
//       // Refresh appeals data after response
//       fetchAppeals();
//     } catch (error) {
//       toast.error("Error processing response");
//     }
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <PageTitle>Chef Appeals for Your Requests</PageTitle>
//       {/* <h1 className="text-xl mb-4">Chef Appeals for Your Requests</h1> */}
//       {Object.keys(appeals).map((requestId) => (
//         <div key={requestId} className="mb-6">
//           <SectionTitle>
//             Request for {appeals[requestId][0].request_id.food_preference} on {new Date(appeals[requestId][0].request_id.date).toLocaleDateString()}
//           </SectionTitle>
//           <TableContainer className="mb-8">
//             <Table>
//               <TableHeader>
//                 <tr>
//                   <TableCell>Chef</TableCell>
//                   <TableCell>Response Status</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </tr>
//               </TableHeader>
//               <TableBody>
//                 {appeals[requestId].map((appeal) => (
//                   <TableRow key={appeal._id}>
//                     <TableCell>
//                       <span className="text-sm">
//                       {appeal.chef_id.name}
//                       </span>
//                       </TableCell>
//                     <TableCell>
//                     <span className="text-sm">
//                       {appeal.response_status}
//                       </span>
//                     </TableCell>
//                     <TableCell>
//                       <Button onClick={() => handleResponse(appeal._id, 'accept')}>Accept</Button>
//                       <Button onClick={() => handleResponse(appeal._id, 'reject')} layout="link">Reject</Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       ))}
//     </div>
//   );
// };




// import React, { useState, useEffect } from 'react'

// import PageTitle from '../uicomponents/Typography/PageTitle'
// import SectionTitle from '../uicomponents/Typography/SectionTitle'
// import CTA from '../uicomponents/CTA'
// import {
//   Table,
//   TableHeader,
//   TableCell,
//   TableBody,
//   TableRow,
//   TableFooter,
//   TableContainer,
//   Badge,
//   Avatar,
//   Button,
//   Pagination,
// } from '@windmill/react-ui'
// import { EditIcon, TrashIcon } from '../icons'

// import response from '../utils/demo/tableData'
// // make a copy of the data, for the second table
// const response2 = response.concat([])

// function Tables() {
//   /**
//    * DISCLAIMER: This code could be badly improved, but for the sake of the example
//    * and readability, all the logic for both table are here.
//    * You would be better served by dividing each table in its own
//    * component, like Table(?) and TableWithActions(?) hiding the
//    * presentation details away from the page view.
//    */

//   // setup pages control for every table
//   const [pageTable1, setPageTable1] = useState(1)
//   const [pageTable2, setPageTable2] = useState(1)

//   // setup data for every table
//   const [dataTable1, setDataTable1] = useState([])
//   const [dataTable2, setDataTable2] = useState([])

//   // pagination setup
//   const resultsPerPage = 10
//   const totalResults = response.length

//   // pagination change control
//   function onPageChangeTable1(p) {
//     setPageTable1(p)
//   }

//   // pagination change control
//   function onPageChangeTable2(p) {
//     setPageTable2(p)
//   }

//   // on page change, load new sliced data
//   // here you would make another server request for new data
//   useEffect(() => {
//     setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
//   }, [pageTable1])

//   // on page change, load new sliced data
//   // here you would make another server request for new data
//   useEffect(() => {
//     setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
//   }, [pageTable2])

//   return (
//     <>
//       <PageTitle>Tables</PageTitle>

//       <CTA />

//       <SectionTitle>Simple table</SectionTitle>
//       <TableContainer className="mb-8">
//         <Table>
//           <TableHeader>
//             <tr>
//               <TableCell>Client</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Date</TableCell>
//             </tr>
//           </TableHeader>
//           <TableBody>
//             {dataTable1.map((user, i) => (
//               <TableRow key={i}>
//                 <TableCell>
//                   <div className="flex items-center text-sm">
//                     <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" />
//                     <div>
//                       <p className="font-semibold">{user.name}</p>
//                       <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">$ {user.amount}</span>
//                 </TableCell>
//                 <TableCell>
//                   <Badge type={user.status}>{user.status}</Badge>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TableFooter>
//           <Pagination
//             totalResults={totalResults}
//             resultsPerPage={resultsPerPage}
//             onChange={onPageChangeTable1}
//             label="Table navigation"
//           />
//         </TableFooter>
//       </TableContainer>

//       <SectionTitle>Table with actions</SectionTitle>
//       <TableContainer className="mb-8">
//         <Table>
//           <TableHeader>
//             <tr>
//               <TableCell>Client</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Actions</TableCell>
//             </tr>
//           </TableHeader>
//           <TableBody>
//             {dataTable2.map((user, i) => (
//               <TableRow key={i}>
//                 <TableCell>
//                   <div className="flex items-center text-sm">
//                     <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" />
//                     <div>
//                       <p className="font-semibold">{user.name}</p>
//                       <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">$ {user.amount}</span>
//                 </TableCell>
//                 <TableCell>
//                   <Badge type={user.status}>{user.status}</Badge>
//                 </TableCell>
//                 <TableCell>
//                   <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center space-x-4">
//                     <Button layout="link" size="icon" aria-label="Edit">
//                       <EditIcon className="w-5 h-5" aria-hidden="true" />
//                     </Button>
//                     <Button layout="link" size="icon" aria-label="Delete">
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
//             onChange={onPageChangeTable2}
//             label="Table navigation"
//           />
//         </TableFooter>
//       </TableContainer>
//     </>
//   )
// }

// export default Tables
