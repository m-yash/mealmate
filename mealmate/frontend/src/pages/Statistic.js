import React, { useEffect, useState } from 'react';
import InfoCard from '../uicomponents/Cards/InfoCard';
import ChartCard from '../uicomponents/Chart/ChartCard';
import { Bar } from 'react-chartjs-2';
import SectionTitle from '../uicomponents/Typography/SectionTitle';
import PageTitle from '../uicomponents/Typography/PageTitle'

const StatisticsPage = () => {
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalAppeals, setTotalAppeals] = useState(0);
  const [averageAppeals, setAverageAppeals] = useState(0);
  const [monthlyData, setMonthlyData] = useState({ monthlyRequests: [], monthlyAppeals: [] });

  const getLastSixMonths = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    return Array.from({ length: 6 }, (_, i) => months[(currentMonth - 5 + i + 12) % 12]);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const requestsResponse = await fetch('/stats/food-requests');
        const requestsData = await requestsResponse.json();
        setTotalRequests(requestsData.totalRequests);

        const appealsResponse = await fetch('/stats/appeals');
        const appealsData = await appealsResponse.json();
        setTotalAppeals(appealsData.totalAppeals);

        const averageResponse = await fetch('/stats/average-appeals');
        const averageData = await averageResponse.json();
        setAverageAppeals(averageData.averageAppeals);

        const monthlyResponse = await fetch('/stats/monthly-data');
        const monthlyData = await monthlyResponse.json();
        setMonthlyData(monthlyData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, []);

  const barChartData = {
    // labels: getLastSixMonths(),
    labels: monthlyData.monthlyRequests.map((req) => req.name), // Month names from API
    datasets: [
      {
        label: 'Food Requests',
        backgroundColor: '#0694a2',
        borderWidth: 1,
        // data: monthlyData.monthlyRequests,
        data: monthlyData.monthlyRequests.map((req) => req.count),
      },
      {
        label: 'Chef Appeals',
        backgroundColor: '#7e3af2',
        borderWidth: 1,
        // data: monthlyData.monthlyAppeals,
        data: monthlyData.monthlyAppeals.map((appeal) => appeal.count),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div>
    <PageTitle>Statistics</PageTitle>
      <SectionTitle>Statistics for last 30 Days</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Food Requests" value={totalRequests} />
        <InfoCard title="Total Appeals" value={totalAppeals} />
        <InfoCard title="Average Appeals per Request" value={averageAppeals} />
      </div>
      <SectionTitle>Statistics for last 6 months</SectionTitle>
      <ChartCard title="Monthly Food Requests and Appeals" style={{ height: '400px', overflow: 'auto' }}>
        <Bar data={barChartData} options={chartOptions} />
      </ChartCard>
    </div>
  );
};

export default StatisticsPage;