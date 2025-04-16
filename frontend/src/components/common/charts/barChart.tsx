import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  incomes: { total: number; createdAt: string }[];
  expenses: { total: number; createdAt: string }[];
}

const BarChart: React.FC<BarChartProps> = React.memo(({ incomes, expenses }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const monthlyData = useMemo(() => {
    const data = Array.from({ length: 12 }, () => ({ incomes: 0, expenses: 0 }));
    (Array.isArray(incomes) ? incomes : []).forEach(income => {
      const month = new Date(income.createdAt).getMonth();
      data[month].incomes += income.total;
    });
    (Array.isArray(expenses) ? expenses : []).forEach(expense => {
      const month = new Date(expense.createdAt).getMonth();
      data[month].expenses += expense.total;
    });
    return data;
  }, [incomes, expenses]);

  useEffect(() => {
    const labels = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const incomeData = monthlyData.map(data => data.incomes);
    const expenseData = monthlyData.map(data => data.expenses);

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.data.datasets[0].data = incomeData;
          chartInstanceRef.current.data.datasets[1].data = expenseData;
          chartInstanceRef.current.update();
        } else {
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
                  text: 'Monthly Incomes and Expenses',
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
    }
  }, [monthlyData]);

  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  if (!incomes?.length && !expenses?.length) {
    return <p>No data available</p>;
  }

  return <canvas ref={chartRef}></canvas>;
});

export default BarChart;