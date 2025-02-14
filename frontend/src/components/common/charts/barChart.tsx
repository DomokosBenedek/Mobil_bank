import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { logicks } from '../logic';

const BarChart: React.FC = () => {
  const { incomes, expenses, activeAccount } = logicks();

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const monthlyData = Array.from({ length: 12 }, () => ({ incomes: 0, expenses: 0 }));

    if(incomes.length>0){
      incomes?.forEach(income => {
        const month = new Date(income.createdAt).getMonth();
        monthlyData[month].incomes += income.total;
      });
    }
    if(expenses.length>0){
      expenses?.forEach(expense => {
        const month = new Date(expense.createdAt).getMonth();
        monthlyData[month].expenses += expense.total;
      });
    }


    const labels = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const incomeData = monthlyData.map(data => data.incomes);
    const expenseData = monthlyData.map(data => data.expenses);

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Incomes',
                data: incomeData,
                backgroundColor: '#00008B',
              },
              {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: '#FFA500',
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Monthly Incomes and Expenses for 2025',
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [incomes, expenses, activeAccount]);

  if (!incomes?.length && !expenses?.length) {
    return <p>No data available</p>;
  }

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;