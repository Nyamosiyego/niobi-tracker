/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Sidebar, Navbar } from 'flowbite-react';
import { HiChartPie, HiTable, HiViewBoards } from 'react-icons/hi';
import Link from 'next/link';
import Logo from '@/public/Logo.png';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { PropagateLoader } from 'react-spinners';


const Forecast = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/forecast');
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const labels = data.map((entry) => entry.date);
      const incomeData = data.map((entry) => entry.income);
      const expensesData = data.map((entry) => entry.expenses);

      const ctx = chartRef.current.getContext('2d');

      chartRef.current.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              backgroundColor: ['#4CAF50'],
              borderColor: '#4CAF50',
              borderWidth: 1,
            },
            {
              label: 'Expenses',
              data: expensesData,
              backgroundColor: ['#36A2EB'],
              borderColor: '#36A2EB',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: { stacked: false },
            y: { stacked: false },
          },
        },
      });
    }
  }, [data, chartRef]);

  if(data?.length === 0) {
    return (
      <div className=''>
        <Navbar fluid className='bg-green-700 h-20 py-0'>
          <Navbar.Brand as={Link} href='/'>
            <img src={Logo.src} className='h-20 sm:h-9' alt='Niobi' />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'></span>
          </Navbar.Brand>
        </Navbar>
        <div className='flex'>
          <Sidebar rounded aria-label='Default sidebar example' className='h-screen '>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href='/' icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item href='/history' icon={HiViewBoards}>
                  History
                </Sidebar.Item>
                <Sidebar.Item href='/forecast' icon={HiTable}>
                  Forecast
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          <div className='px-4 py-4'>
            <h1 className='font-bold text-2xl'>Future Forecasts</h1>
              <PropagateLoader color="#36d7b7" size={30} />
          </div>
        </div>
      </div>
    );
  }

    return (
      <>
      <title>Forecast</title>
      <div className=''>
        <Navbar fluid className='bg-green-700 h-20 py-0'>
          <Navbar.Brand as={Link} href='/'>
            <img src={Logo.src} className='h-20 sm:h-9' alt='Niobi' />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'></span>
          </Navbar.Brand>
        </Navbar>
        <div className='flex'>
          <Sidebar rounded aria-label='Default sidebar example' className='h-screen '>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href='/' icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item href='/history' icon={HiViewBoards}>
                  History
                </Sidebar.Item>
                <Sidebar.Item href='/forecast' icon={HiTable}>
                  Forecast
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          <div className='px-4 py-4'>
            <h1 className='font-bold text-2xl'>Future Forecasts</h1>
            <canvas ref={chartRef} width='900' height='500'/>
          </div>
        </div>
      </div>
      </>
    );
  };

  
  export default Forecast;