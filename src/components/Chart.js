import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";




const DynamicChart = () => {
  return (
    <div className="App">
      <Line
        datasetIdKey="id"
        data={{
          labels: ["0", "1", "2", "3"],
          datasets: [
            {
              id: 1,
              label: "Cost",
              data: [3, 5, 4, 2, 0],
              /* backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ], */
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1,
              fill:false
            },
          ],
        }}
      />
      <Bar
        datasetIdKey="id1"
        data={{
          labels: ["Tac", "Spi", "Neu", "Lea", "Lor"],
          datasets: [
            {
              id: 1,
              label: "Spheres",
              data: [3, 5, 4, 2, 2, 0],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};
export default DynamicChart;
