/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Sidebar, Navbar, Table } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/Logo.png'
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';


const History = () => {
    const [data, setData] = useState();
    const chartRef = useRef(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('/api/data');
        setData(result.data);
      };
      fetchData();
    }, []);
  
    useEffect(() => {
        // Ensure data is available before attempting to create the chart
        if (chartRef.current && data?.length > 0) {
          // Destroy any existing chart instance
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
          }
    
          const labels = data.map((entry) => entry.date);
          const incomeData = data.map((entry) => entry.income);
          const expensesData = data.map((entry) => entry.expenses);
    
          const ctx = chartRef.current.getContext('2d');
    
          chartRef.current.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Income',
                  data: incomeData,
                  backgroundColor: ['#36A2EB', '#4CAF50', '#FFCE56', '#9966FF', '#FF9F40', '#FF6384'],
                  borderWidth: 1,
                },
                {
                  label: 'Expenses',
                  data: expensesData,
                  backgroundColor: ['#FFCE56', '#9966FF', '#FF6384', '#4CAF50', '#36A2EB', '#36A2EB'],
                  borderColor: '#f7b731',
                  borderWidth: 1,
                },
              ],
            },
            hoverOffset: 4,
            options: {
              scales: {
                x: { stacked: false },
                y: { stacked: false },
              },
            },
          });
        }
    }, [data]);
  
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
            <h1 className='font-bold text-2xl'>Past Historical Data</h1>
            <canvas ref={chartRef} width='700' height='500'/>
          </div>
          <div className="overflow-x-auto">
          <h2 className='font-bold text-2xl px-4 mt-4 mb-4'>Table</h2>
            <Table>
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Income (KES)</Table.HeadCell>
                <Table.HeadCell>Expenses (KES)</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data?.map((entry) => (
                  <Table.Row key={entry.date} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {entry.date}
                    </Table.Cell>
                    <Table.Cell>{entry.income.toFixed(2)}</Table.Cell>
                    <Table.Cell>{entry.expenses.toFixed(2)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  };
  
  export default History;