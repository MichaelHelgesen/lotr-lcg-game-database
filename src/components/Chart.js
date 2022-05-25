import React from "react";
import { Line, Bar } from "react-chartjs-2";

const DynamicChart = (props) => {
const { value, deckInformation } = props

const cardDataList = [...value.filter(obj => obj.cardObject.cardType._ref !== "hero").map(obj => {
    return {
        spheres: obj.cardObject.sphere._ref,
        cardQuantity: obj.cardQuantity,
        cost: obj.cardObject.cost,
        types: obj.cardObject.cardType._ref
    }
})]


const types = [...new Set(cardDataList.map(card => card.types))].sort()
const numberOfTypes = [...types.map(type => cardDataList.filter(ref => ref.types == type).map(card => card.cardQuantity).reduce((prev, next) => prev + next, 0)), 0]


//const spheres = [...new Set(value.map(card => card.cardObject.sphere._ref))].sort()
const numberOfSpheres = [...deckInformation.spheres.sort().map(sphere => 
  {
    const filteredValue = value.filter(obj => obj.cardObject.sphere._ref == sphere && obj.cardObject.cardType._ref !== "hero").map(obj => obj.cardQuantity).reduce((prev, next) => prev + next, 0)
    return filteredValue
  }), 0]
const costBySphere = deckInformation.spheres.map(sphere => {
    let totalCost = 0
    let filteredValue = value.filter(obj => obj.cardObject.sphere._ref == sphere && obj.cardObject.cardType._ref !== "hero").map(obj => (obj.cardObject.cost * obj.cardQuantity))
    totalCost = filteredValue.reduce((prevValue, nextValue) => 
        prevValue + nextValue, 0)
return totalCost
    })

const costValues = cardDataList.filter(card => card.cost).map(card => card.cost).sort()
const numberOfCostValues = [0, ...new Set(costValues)].map(cost => {
    let totalCost = 0
    let filteredValue = value.filter(obj => obj.cardObject.cost == cost).map(el => el.cardQuantity)
    totalCost = filteredValue.reduce((prevValue, nextValue) => 
        prevValue + nextValue, 0)
return totalCost
    })

return (
    <div className="App">
      <Line
        datasetIdKey="id"
        data={{
          labels: [0, ...new Set(costValues)],
          datasets: [
            {
              id: 1,
              label: "Card cost",
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
          labels: deckInformation.spheres,
          datasets: [
            {
              id: 1,
              label: "Spheres",
              data: numberOfSpheres,
              backgroundColor: [
                'rgba(173, 98, 165, 0.2)',
                'rgba(81, 184, 72, 0.2)',
                'rgba(97, 97, 97, 0.2)',
                'rgba(41, 128, 185, 0.2)',
                'rgba(192, 1, 6, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(173, 98, 165)',
                'rgb(81, 184, 72)',
                'rgb(97, 97, 97)',
                'rgb(41, 128, 185)',
                'rgb(192, 1, 6)',
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
          labels: deckInformation.spheres,
          datasets: [
            {
              id: 1,
              label: "Cost by spheres",
              data: [...costBySphere, 0],
              backgroundColor: [
                'rgba(173, 98, 165, 0.2)',
                'rgba(81, 184, 72, 0.2)',
                'rgba(97, 97, 97, 0.2)',
                'rgba(41, 128, 185, 0.2)',
                'rgba(192, 1, 6, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(173, 98, 165)',
                'rgb(81, 184, 72)',
                'rgb(97, 97, 97)',
                'rgb(41, 128, 185)',
                'rgb(192, 1, 6)',
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
        datasetIdKey="id3"
        data={{
          labels: types,
          datasets: [
            {
              id: 1,
              label: "Types",
              data: [...numberOfTypes, 0],
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
