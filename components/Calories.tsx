'use client';
import { useEffect } from 'react';

interface Props {
  protein: number;
  fat: number;
  carbs: number;
}

const Calories: React.FC<Props> = ({ protein, fat, carbs }) => {
  useEffect(() => {
    const { Chart } = require('chart.js');
    new Chart(document.getElementById('chartDoughnut') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: ['Protein', 'Fat', 'Carbs'],
        datasets: [
          {
            data: [protein, fat, carbs],
            backgroundColor: [
              'rgb(133, 105, 241)',
              'rgb(164, 101, 241)',
              'rgb(101, 143, 241)'
            ],
            hoverOffset: 4
          }
        ]
      },
      options: {}
    });
  }, [protein, fat, carbs]);

  return (
    <div>
      <div
        className="shadow-lg rounded-lg 
overflow-hidden"
      >
        <canvas id="chartDoughnut"></canvas>
      </div>
    </div>
  );
};

export default Calories;
