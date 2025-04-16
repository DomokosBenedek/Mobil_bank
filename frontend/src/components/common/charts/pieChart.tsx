import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';

interface PieChartProps {
  incomes: { total: number; createdAt: string }[];
  expenses: { total: number; createdAt: string }[];
}

const PieChart: React.FC<PieChartProps> = ({ incomes, expenses }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const { sumIncomes, sumExpenses } = useMemo(() => {
    const totalIncomes = (Array.isArray(incomes) ? incomes : []).reduce((sum, income) => sum + income.total, 0);
    const totalExpenses = (Array.isArray(expenses) ? expenses : []).reduce((sum, expense) => sum + expense.total, 0);
    return { sumIncomes: totalIncomes, sumExpenses: totalExpenses };
  }, [incomes, expenses]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        chartInstanceRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Expenses', 'Incomes'],
            datasets: [
              {
                data: [sumExpenses, sumIncomes],
                backgroundColor: ['#FFA500', '#00008B'],
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
                text: 'Incomes and Expenses',
              },
            },
          },
        });
      }
    }
  }, [sumIncomes, sumExpenses]);

  if (!incomes?.length && !expenses?.length) {
    return <p>No data available</p>;
  }

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;