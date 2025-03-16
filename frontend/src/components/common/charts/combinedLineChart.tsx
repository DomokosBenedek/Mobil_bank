import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface CombinedLineChartProps {
  exchangeRates: { [key: string]: { rate: number; date: string }[] };
  ism: number;
}

const CombinedLineChart: React.FC<CombinedLineChartProps> = ({ exchangeRates, ism }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const labels = exchangeRates[Object.keys(exchangeRates)[0]].map(rate => rate.date);
    const datasets = Object.keys(exchangeRates).map(currency => ({
      label: `${currency.toUpperCase()} Exchange Rate`,
      data: exchangeRates[currency].map(rate => rate.rate),
      borderColor: getRandomColor(),
      backgroundColor: undefined,
      fill: false,
    }));

    const allRates = Object.values(exchangeRates).flat().map(rate => rate.rate);
    const minRate = Math.min(...allRates);
    const maxRate = Math.max(...allRates);

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
            datasets,
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Exchange Rates for the Last ${ism} Days`,
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

  if (!Object.keys(exchangeRates).length) {
    return <p>No data available</p>;
  }

  return <canvas ref={chartRef}></canvas>;
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default CombinedLineChart;