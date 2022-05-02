import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";




const DynamicChart = (props) => {
const { deckList, value } = props



const spheres = [...new Set(deckList.map(card => card.sphere._ref))].sort()
console.log([...spheres.map(sphere => deckList.filter(ref => ref.sphere._ref == sphere && ref.cardType._ref != "hero").map(obj => obj.name + obj.quantity)), 0])
const numberOfSpheres = [...spheres.map(sphere => deckList.filter(ref => ref.sphere._ref == sphere).map(card => card.quantity).reduce((prev, next) => prev + next, 0)), 0]
const costBySphere = [...spheres.map(sphere => value.filter(val => val._ref == sphere && ref.cost).length), 0]

const costValues = deckList.filter(card => card.cost).map(card => card.cost).sort()
const numberOfCostValues = [0, ...new Set(costValues)].map(cost => costValues.filter(num => num == cost).length)



return (
    <div className="App">
      <Line
        datasetIdKey="id"
        data={{
          labels: [0, ...new Set(costValues)],
          datasets: [
            {
              id: 1,
              label: "Spheres",
              data: numberOfCostValues,
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
          labels: spheres,
          datasets: [
            {
              id: 1,
              label: "Spheres",
              data: numberOfSpheres,
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
      <Bar
        datasetIdKey="id2"
        data={{
          labels: spheres,
          datasets: [
            {
              id: 1,
              label: "Spheres",
              data: costBySphere,
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
