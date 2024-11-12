const express = require('express');
const mongoose = require('mongoose');
const Request = require('../models/Request'); // Adjust the path as necessary
const UserResponse = require('../models/UserResponses'); // Adjust the path as necessary

const router = express.Router();

// 1. Total number of food requests made in the last 30 days
router.get('/food-requests', async (req, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const count = await Request.countDocuments({ created_at: { $gte: thirtyDaysAgo } });
  res.json({ totalRequests: count });
});

// 2. Total number of appeals made in the last 30 days
router.get('/appeals', async (req, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const count = await UserResponse.countDocuments({ created_at: { $gte: thirtyDaysAgo } });
  res.json({ totalAppeals: count });
});

// 3. Monthly data for the last 6 months for bar chart
router.get('/monthly-data', async (req, res) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
    // Helper function to create monthly structure with default count 0
    const initializeMonths = () => {
        const months = [];
        const currentDate = new Date();
        for (let i = 5; i >= 0; i--) {
          const date = new Date();
          date.setMonth(currentDate.getMonth() - i);
          months.push({ _id: date.getMonth() + 1, name: date.toLocaleString('default', { month: 'short' }), count: 0 });
        }
        return months;
    };
  
    // Retrieve and aggregate requests data
    const requests = await Request.aggregate([
      { $match: { created_at: { $gte: sixMonthsAgo } } },
      { $group: { _id: { $month: "$created_at" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
  
    // Retrieve and aggregate appeals data
    const appeals = await UserResponse.aggregate([
      { $match: { created_at: { $gte: sixMonthsAgo } } },
      { $group: { _id: { $month: "$created_at" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
  
    // Populate missing months with default values
    const monthlyRequests = initializeMonths().map(month => {
        const data = requests.find(r => r._id === month._id);
        return { _id: month._id, name: month.name, count: data ? data.count : month.count };
    });
  
    const monthlyAppeals = initializeMonths().map(month => {
        const data = appeals.find(a => a._id === month._id);
        return { _id: month._id, name: month.name, count: data ? data.count : month.count };
    });
  
    res.json({ monthlyRequests, monthlyAppeals });
});
// router.get('/monthly-data', async (req, res) => {
//     const now = new Date();
//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(now.getMonth() - 5);
  
//     const months = Array.from({ length: 6 }, (_, i) => {
//       const date = new Date(sixMonthsAgo);
//       date.setMonth(date.getMonth() + i);
//       return {
//         month: date.getMonth() + 1, // Month in numeric format
//         year: date.getFullYear(),
//       };
//     });
  
//     // Helper function to format the result with zero counts for empty months
//     const formatMonthlyData = (data) => {
//       return months.map(({ month, year }) => {
//         const entry = data.find(item => item._id.month === month && item._id.year === year);
//         return entry ? entry.count : 0;
//       });
//     };
  
//     // Fetch requests and appeals data grouped by month
//     const monthlyRequests = await Request.aggregate([
//       {
//         $match: { created_at: { $gte: sixMonthsAgo } },
//       },
//       {
//         $group: {
//           _id: { month: { $month: "$created_at" }, year: { $year: "$created_at" } },
//           count: { $sum: 1 }
//         }
//       },
//     ]);
  
//     const monthlyAppeals = await UserResponse.aggregate([
//       {
//         $match: { created_at: { $gte: sixMonthsAgo } },
//       },
//       {
//         $group: {
//           _id: { month: { $month: "$created_at" }, year: { $year: "$created_at" } },
//           count: { $sum: 1 }
//         }
//       },
//     ]);
  
//     res.json({
//       monthlyRequests: formatMonthlyData(monthlyRequests),
//       monthlyAppeals: formatMonthlyData(monthlyAppeals),
//     });
//   });
// router.get('/monthly-data', async (req, res) => {
//   const sixMonthsAgo = new Date();
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//   const monthlyRequests = await Request.aggregate([
//     {
//       $match: {
//         created_at: { $gte: sixMonthsAgo },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: "$created_at" },
//         count: { $sum: 1 }
//       }
//     },
//     {
//       $sort: { _id: 1 }
//     }
//   ]);

//   const monthlyAppeals = await UserResponse.aggregate([
//     {
//       $match: {
//         created_at: { $gte: sixMonthsAgo },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: "$created_at" },
//         count: { $sum: 1 }
//       }
//     },
//     {
//       $sort: { _id: 1 }
//     }
//   ]);

//   res.json({ monthlyRequests, monthlyAppeals });
// });

// 4. Average appeals per request
router.get('/average-appeals', async (req, res) => {
  const totalRequests = await Request.countDocuments();
  const totalAppeals = await UserResponse.countDocuments();
  const average = totalRequests > 0 ? (totalAppeals / totalRequests).toFixed(2) : 0;
  res.json({ averageAppeals: average });
});

module.exports = router;