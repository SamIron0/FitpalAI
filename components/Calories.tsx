'use client';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ["JavaScript", "Python", "Ruby"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(133, 105, 241)",
        "rgb(164, 101, 241)",
        "rgb(101, 143, 241)",
      ],
      hoverOffset: 4,
    },
  ],
};

function ChartComponent() {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="py-3 px-5 bg-gray-50">Doughnut chart</div>
      <div className="p-10">
        <Doughnut data={data} options={{}} />
      </div>
    </div>
  );
}

export default ChartComponent;