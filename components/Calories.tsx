'use client';

interface Props {
  protein: number;
  fat: number;
  carbs: number;
}
export function Calories({ protein, fat, carbs }: Props) {
  const { Doughnut } = require('https://cdn.jsdelivr.net/npm/chart.js');

  const data = {
    labels: ['Protein', 'Fat', 'Carbs'],
    datasets: [
      {
        label: 'Macronutrient Distribution',
        data: [protein, fat, carbs],
        backgroundColor: [
          'rgb(133, 105, 241)',
          'rgb(164, 101, 241)',
          'rgb(101, 143, 241)'
        ],
        hoverOffset: 4
      }
    ]
  };

  new Doughnut(document.getElementById('chartDoughnut'), {
    type: 'doughnut',
    data: data,
    options: {}
  });

  return (
    <div>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <canvas className="p-10" id="chartDoughnut"></canvas>
      </div>
    </div>
  );
}
