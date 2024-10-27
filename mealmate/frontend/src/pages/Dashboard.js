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

// function Dashboard() {
//   const [page, setPage] = useState(1)
//   const [data, setData] = useState([])

//   // pagination setup
//   const resultsPerPage = 10
//   const totalResults = response.length

//   // pagination change control
//   function onPageChange(p) {
//     setPage(p)
//   }


//   // on page change, load new sliced data
//   // here you would make another server request for new data
//   useEffect(() => {
//     setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
//   }, [page])

//   return (
//     <>
//       <PageTitle>Dashboard</PageTitle>


//       <SectionTitle>Available Requests</SectionTitle>
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
//             {data.map((user, i) => (
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
//             onChange={onPageChange}
//             label="Table navigation"
//           />
//         </TableFooter>
//       </TableContainer>

//       <PageTitle>Charts</PageTitle>
//       <div className="grid gap-6 mb-8 md:grid-cols-2">
//         <ChartCard title="Revenue">
//           <Doughnut {...doughnutOptions} />
//           <ChartLegend legends={doughnutLegends} />
//         </ChartCard>

//         <ChartCard title="Traffic">
//           <Line {...lineOptions} />
//           <ChartLegend legends={lineLegends} />
//         </ChartCard>
//       </div>
//     </>
//   )
// }
function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  const fetchRequests = async () => {
    try {
      const response = await fetch('/request/all-request');
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

  return (
    <>
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
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
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
