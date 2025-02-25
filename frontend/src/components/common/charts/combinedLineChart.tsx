import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface CombinedLineChartProps {
  eurExchangeRates: { rate: number; date: string }[];
  usdExchangeRates: { rate: number; date: string }[];
  ism: number;
}

const CombinedLineChart: React.FC<CombinedLineChartProps> = ({ eurExchangeRates, usdExchangeRates, ism }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const labels = eurExchangeRates.map(rate => rate.date);
    const eurData = eurExchangeRates.map(rate => rate.rate);
    const usdData = usdExchangeRates.map(rate => rate.rate);

    const minRate = Math.min(...eurData, ...usdData);
    const maxRate = Math.max(...eurData, ...usdData);

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
                label: 'EUR Exchange Rate',
                data: eurData,
                borderColor: '#00008B',
                backgroundColor: undefined,
                fill: false,
              },
              {
                label: 'USD Exchange Rate',
                data: usdData,
                borderColor: '#FF0000',
                backgroundColor: undefined,
                fill: false,
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
                text: `EUR and USD Exchange Rates for the Last ${ism} Days`,
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
  }, [eurExchangeRates, usdExchangeRates]);

  if (!eurExchangeRates?.length || !usdExchangeRates?.length) {
    return <p>No data available</p>;
  }

  return <canvas ref={chartRef}></canvas>;
};

export default CombinedLineChart;