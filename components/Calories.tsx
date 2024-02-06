'use client';
import React, { use, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Macros, UserDetails } from '@/types';
import { useUserDetails } from '@/app/providers/UserDetailsContext';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CaloriesProps {
  macros?: Macros | null | undefined;
}
export function Calories({ macros }: CaloriesProps) {
  const { userDetails, setUserDetails } = useUserDetails();
  const [proteins, setProteins] = useState(
    userDetails?.macros?.protein || macros?.protein
  );
  const [carbs, setCarbs] = useState(
    userDetails?.macros?.carbs || macros?.carbs
  );
  const [fats, setFats] = useState<string | number | undefined | null>(
    userDetails?.macros?.fat || macros?.fat
  );

  const [data, setData] = useState({
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
  });
  useEffect(() => {
    setProteins(userDetails?.macros?.protein);
    setCarbs(userDetails?.macros?.carbs);
    setFats(userDetails?.macros?.fat);

    setData({
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
    });
  }, [userDetails]);

  return <Doughnut data={data} />;
}
