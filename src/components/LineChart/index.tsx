"use client";

import { useEffect, useRef } from "react";
import Chart, { ChartItem } from "chart.js/auto";

interface LineChartType {
    prices: number[];
    start_date: string;
}

const isoStringToDate = (isoString:string) => {
    const date = new Date(isoString);
    const options = { month: 'long', day: 'numeric' };
    // @ts-ignore
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    return `${formattedDate}${suffix}`;
  };
  
  const getDaySuffix = (day:number) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const getFormattedDate = (date: Date) => {
    const options = { month: 'long', day: 'numeric' };
    // @ts-ignore
    return date.toLocaleDateString('en-US', options);
  };

  const generateDateStringLoop = (n:number, s: string) => {
    const startDate = new Date(s);
    const dateStrings = [];
  
    for (let i = 0; i < n; i++) {
      const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000); // Add i days to the starting date
      const formattedDate = getFormattedDate(currentDate);
      dateStrings.push(isoStringToDate(formattedDate));
    }
  
    return dateStrings;
  };
  

function isValidISOString(dateString: string): boolean {
    return new Date(dateString).toISOString() === dateString;
}

const Linechart = ({prices, start_date}:LineChartType) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!isValidISOString(start_date)) {
        return () => null;
    }

    const isoStrings = generateDateStringLoop(prices.length, start_date);

    if (chartRef.current) {
      const labels = isoStrings;
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Price",
            data: prices,
          },
        ],
      };
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: data,
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [prices, start_date]);

  return <canvas ref={chartRef} />;
};

export default Linechart;
