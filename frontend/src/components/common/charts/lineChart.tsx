import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
  exchangeRates: { rate: number; date: string }[];
  ism: number;
  currency: string;
}

const LineChart: React.FC<LineChartProps> = ({ exchangeRates, ism , currency}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const labels = exchangeRates.map(rate => rate.date);
    const data = exchangeRates.map(rate => rate.rate);

    const minRate = Math.min(...data);
    const maxRate = Math.max(...data);

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
        chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: `${currency.toUpperCase()} Exchange Rate`,
                data,
                borderColor: '#00008B',
                backgroundColor: 'rgba(0, 0, 139, 0.2)',
                fill: true,
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
                text: `${currency.toUpperCase()} Exchange Rate for the Last ${ism} Days`,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
                min: minRate - (maxRate - minRate) * 0.1, // Add some padding below the min value
                max: maxRate + (maxRate - minRate) * 0.1, // Add some padding above the max value
              },
            },
          },
        });
      }
    }
  }, [exchangeRates]);

  if (!exchangeRates?.length) {
    return <p>No data available</p>;
  }

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;