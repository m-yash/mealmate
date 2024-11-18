import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHeader, TableCell, TableRow, TableBody, Button, Pagination } from '@windmill/react-ui';
import { TrashIcon } from '../icons';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SectionTitle from '../uicomponents/Typography/SectionTitle'
import PageTitle from '../uicomponents/Typography/PageTitle'


function MyAppeals() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 8;

  const fetchMyAppeals = async () => {
    try {
      const chefId = localStorage.getItem('user_id');
      const response = await axios.get(`/responses/my-appeals?chef_id=${chefId}`);
      setData(response.data);
      setTotalResults(response.data.length);
    } catch (error) {
      toast.error('Error fetching your appeals.');
    }
  };

  useEffect(() => {
    fetchMyAppeals();
  }, []);

  const handleRevokeAppeal = async (appealId) => {
    try {
      await axios.post('/responses/revoke', { appealId });
      toast.success('Appeal revoked successfully');
      fetchMyAppeals();
    } catch (error) {
      toast.error('Failed to revoke appeal');
    }
  };

  return (
    <>
      <ToastContainer />
      <PageTitle>Appeals</PageTitle>
      <SectionTitle>Appeals made by you</SectionTitle>
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
            {data.slice((page - 1) * resultsPerPage, page * resultsPerPage).map((appeal, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">
                    {appeal.request_id.food_preference}
                  </span>
                  </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(appeal.request_id.date).toLocaleDateString()}
                  </span>  
                  </TableCell>
                <TableCell>
                  <Button layout="link" size="icon" aria-label="Revoke" onClick={() => handleRevokeAppeal(appeal._id)}>
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

export default MyAppeals;
