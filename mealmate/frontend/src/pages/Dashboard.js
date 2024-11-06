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

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'

import { EditIcon, TrashIcon } from '../icons'

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() { 
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  // function to fetch location (Lat and Long) of the user logged-in
  // const fetchUserLocation = async () => {
  //   try {
  //     const email = localStorage.getItem('email');
  //     const userResponse = await fetch(`http://localhost:5000/user/location?email=${email}`);
  //     const userData = await userResponse.json();
  //     return { lat: userData.location.lat, lng: userData.location.lng };
  //   } catch (error) {
  //     console.error("Error fetching user location:", error);
  //     return null;
  //   }
  // };

  // const fetchRequests = async () => {
  //   try {

  //     const userLocation = await fetchUserLocation();
  //     if (!userLocation) return;

  //     const { lat, lng } = userLocation;

  //     const response = await fetch(`http://localhost:5000/request/all-request?lat=${lat}&lng=${lng}`);
  //     const requests = await response.json();
  //     // previous implementation to show all requests into the Available request in dashboard 
  //     // const response = await fetch('/request/all-request');
  //     // const requests = await response.json();
  //     setData(requests);
  //     setTotalResults(requests.length);
  //   } catch (error) {
  //     console.error("Error fetching requests:", error);
  //   }
  // };

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

  // New functions to handle appeal and reject actions
const handleAppeal = async (requestId) => {
  try {
    const chefId = localStorage.getItem('user_id'); // Assuming chef ID is stored in localStorage
    const response = await axios.post('http://localhost:5000/responses/appeal', {
      request_id: requestId,
      chef_id: chefId,
    });

    toast.success(response.data.message); // Display success message using toast
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error appealing the request'); // Display error message using toast
  }
};

const handleReject = async (requestId) => {
  try {
    const chefId = localStorage.getItem('user_id');
    const response = await fetch(`/responses/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ request_id: requestId, chef_id: chefId }),
    });
    if (!response.ok) {
      toast.error('Failed to reject request'); // Show error toast if the response is not ok
      return;
    }
    toast.success('Request rejected successfully!'); // Show success toast
  } catch (error) {
    console.error("Error rejecting request:", error);
      toast.error('Error rejecting the request'); // Show error toast
  }
};

  return (
    <>
    <ToastContainer />
      <PageTitle>Dashboard</PageTitle>
      <SectionTitle>Available Requests</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>User</TableCell>
              <TableCell>Food Preference</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
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
                  <span className="text-sm">
                    {request.food_preference}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(request.date).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge type={request.status === 'fulfilled' ? 'success' : request.status === 'cancelled' ? 'danger' : 'warning'}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Appeal" onClick={() => handleAppeal(request._id)}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Reject" onClick={() => handleReject(request._id)}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
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
      </TableContainer>
    </>
  );
}

export default Dashboard
