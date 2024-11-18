import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHeader, TableCell, TableRow, TableBody, Button, Pagination } from '@windmill/react-ui';
import { TrashIcon } from '../icons';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PageTitle from '../uicomponents/Typography/PageTitle'
import SectionTitle from '../uicomponents/Typography/SectionTitle'



function MyRequests() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 8;

  const fetchMyRequests = async () => {
    try {
      const email = localStorage.getItem('email');
      const response = await axios.get(`/request/my-requests?email=${email}`);
      setData(response.data);
      setTotalResults(response.data.length);
    } catch (error) {
      toast.error('Error fetching your requests.');
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const handleDeleteRequest = async (requestId) => {
    try {
      await axios.post('/request/delete', { requestId });
      toast.success('Request deleted successfully');
      fetchMyRequests();
    } catch (error) {
      toast.error('Failed to delete request');
    }
  };

  return (
    <>
      <ToastContainer />
      <PageTitle>Requests</PageTitle>
      <SectionTitle>Your Requests</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Food Request</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.slice((page - 1) * resultsPerPage, page * resultsPerPage).map((request, i) => (
              <TableRow key={i}>
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
                  <Button layout="link" size="icon" aria-label="Delete" onClick={() => handleDeleteRequest(request._id)}>
                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination totalResults={totalResults} resultsPerPage={resultsPerPage} onChange={setPage} />
      </TableContainer>
    </>
  );
}

export default MyRequests;
