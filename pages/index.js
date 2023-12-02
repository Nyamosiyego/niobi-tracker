/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar, Navbar } from 'flowbite-react';
import { HiChartPie, HiTable, HiViewBoards } from 'react-icons/hi';
import Link from 'next/link';
import Logo from '@/public/Logo.png';
import IncomeCard from '@/components/incomeCard';
import ExpensesCard from '@/components/expenseCard';
import HistoryCard from '@/components/historyCard';
import ForecastCard from '@/components/forecastCard';
import CardGrid from '@/components/cardGrid';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/data');
      setData(result.data);
    };
    fetchData();
  }, []);

  const totalIncome = data.reduce((sum, entry) => sum + entry.income, 0);
  const totalExpenses = data.reduce((sum, entry) => sum + entry.expenses, 0);

  return (
    <>
    <title>Niobi</title>
    <div className="">
      <Navbar fluid className="bg-green-700 h-20 py-0">
        <Navbar.Brand as={Link} href="/">
          <img src={Logo.src} className="h-20 sm:h-9" alt="Niobi" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
        </Navbar.Brand>
      </Navbar>
      <div className="flex">
        <Sidebar aria-label="Default sidebar example" className="h-screen ">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="/history" icon={HiViewBoards}>
                History
              </Sidebar.Item>
              <Sidebar.Item href="/forecast" icon={HiTable}>
                Forecast
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="px-4 py-4">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <div className="flex gap-4">
            <CardGrid>
              <IncomeCard totalIncome={totalIncome} />
              <ExpensesCard totalExpenses={totalExpenses} />
            </CardGrid>
            <CardGrid>
              <HistoryCard />
              <ForecastCard />
            </CardGrid>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
