import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { logicks } from '../logic';

interface PieChartProps {
  incomes: { total: number; createdAt: string }[];
  expenses: { total: number; createdAt: string }[];
}

const PieChart: React.FC<PieChartProps> = ({ incomes, expenses }) => {
  const { activeAccount } = logicks();

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const [sumIncomes, setSumIncome] = useState<number>(0);
  const [sumExpenses, setSumExpenses] = useState<number>(0);

  useEffect(() => {
    if (incomes.length > 0) {
      setSumIncome(incomes.reduce((sum, income) => sum + income.total, 0) || 0);
    } else {
      setSumIncome(0);
    }
    if (expenses.length > 0) {
      setSumExpenses(expenses.reduce((sum, expense) => sum + expense.total, 0) || 0);
    } else {
      setSumExpenses(0);
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
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
  }, [incomes, expenses, activeAccount, sumIncomes, sumExpenses]);

  if (!incomes?.length && !expenses?.length) {
    return <p>No data available</p>;
  }

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;