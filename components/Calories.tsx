'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Macros } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CaloriesProps {
  macros: Macros | null | undefined; 
}
export function Calories({ macros }: CaloriesProps) {
  const proteins = macros?.protein || 250;
  const carbs = macros?.carbs || 250;
  const fats = macros?.fat || 44;

  const data = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        label: '# of grams',
        data: [proteins, carbs, fats],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  return <Doughnut data={data} />;
}
