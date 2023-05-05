export const barChartTwoData = [
  {
    name: 'FM 16',
    percentageFill: 26.6,
    barColor: 'blue',
    arrowColor: 'orange',
  },
  {
    name: 'FM 18',
    percentageFill: 19.2,
    barColor: 'red',
    arrowColor: 'white',
  },
  {
    name: 'FM 17',
    percentageFill: 12.2,
    barColor: 'green',
    arrowColor: 'purple',
  },
  {
    name: 'FM 20',
    percentageFill: 7.9,
    barColor: 'orange',
    arrowColor: 'black',
  },
  {
    name: 'FM 14',
    percentageFill: 6,
    barColor: 'orange',
    arrowColor: 'black',
  },
  {
    name: 'Others (6)',
    percentageFill: 28.1,
    barColor: 'orange',
    arrowColor: 'black',
  },
];

export const DonutConfig = [
  {
    percentageFill: 54,
    circleColor1: 'red',
    circleColor2: 'blue',
    linearGradientId: 'donut1',
    name: 'D3.js',
  },
  {
    percentageFill: 90,
    circleColor1: 'blue',
    circleColor2: 'green',
    linearGradientId: 'donut2',
    name: 'Three.js',
  },
  {
    percentageFill: 35,
    circleColor1: 'green',
    circleColor2: 'yellow',
    linearGradientId: 'donut3',
    name: 'Python',
  },
  {
    percentageFill: 62,
    circleColor1: 'yellow',
    circleColor2: 'purple',
    linearGradientId: 'donut4',
    name: 'Java',
  },
  {
    percentageFill: 70,
    circleColor1: 'purple',
    circleColor2: 'orange',
    linearGradientId: 'donut5',
    name: 'Svelte',
  },
  {
    percentageFill: 17,
    circleColor1: 'orange',
    circleColor2: 'red',
    linearGradientId: 'donut6',
    name: 'Unity',
  },
];

// NOTE
// the strokeDashValues do not need to equal 100 when combined
// think of it more as in, what percentage of the total pie chart should this slice take up?
// and then don't forget that the later elements in the array will be layered on top of the earlier elements
// ex. based on values of 100, 70, 50 and 30
// the first slice will fill 100% of the pie chart
// the second slice will fill 70% of the pie chart, overlapping the first 70% of the first slice
// this will make it appear as though the first slice is only 30% of the pie chart (100 - 70)
// the third slice will take up 50% of the pie chart, overlapping the first 50% of the second slice
// this would make it appear as though the first slice is 30% (100 - 70) and then the second slice is 20% (70 - 50)
// the fourth slice will take up 30% of the pie chart, overlapping the first 30% of the third slice
// this would make it appear as though the first slice is 30% (100 - 70) and then the second slice is 20% (70 - 50) and then the third slice is 20% (50 - 30)
// with the final slice being the remaining 30% of the pie chart
// NOTE so there will need to be some math involved in deciding the strokeDashValues
// Memes
export const pieChartOneData = [
  {
    name: 'slice 1',
    id: 'slice1',
    percentage: 50,
    strokeColor: 'blue',
    strokeDashValue: 100,
  },
  {
    name: 'slice 2',
    id: 'slice2',
    percentage: 15,
    strokeColor: 'black',
    strokeDashValue: 60,
  },
  {
    name: 'slice 3',
    id: 'slice3',
    percentage: 15,
    strokeColor: 'red',
    strokeDashValue: 40,
  },
  {
    name: 'slice 4',
    id: 'slice4',
    percentage: 20,
    strokeColor: 'green',
    strokeDashValue: 30,
  },
  {
    name: 'slice 5',
    id: 'slice5',
    percentage: 20,
    strokeColor: 'purple',
    strokeDashValue: 20,
  },
];
// sympathy
export const pieChartTwoData = [
  {
    name: 'slice 1',
    id: 'chart2slice1',
    percentage: 50,
    strokeColor: 'blue',
    strokeDashValue: 100,
  },
  {
    name: 'slice 2',
    id: 'chart2slice2',
    percentage: 15,
    strokeColor: 'black',
    strokeDashValue: 75,
  },
  {
    name: 'slice 3',
    id: 'chart2slice3',
    percentage: 15,
    strokeColor: 'red',
    strokeDashValue: 50,
  },
  {
    name: 'slice 4',
    id: 'chart2slice4',
    percentage: 20,
    strokeColor: 'green',
    strokeDashValue: 40,
  },
  {
    name: 'slice 5',
    id: 'chart2slice5',
    percentage: 20,
    strokeColor: 'purple',
    strokeDashValue: 20,
  },
];
// Je ne sais quoi
export const StaticPie1Data = [
  {
    color: 'red',
    value: 10,
  },
  {
    color: 'blue',
    value: 10,
  },
  {
    color: 'blue',
    value: 20,
  },
  {
    color: 'green',
    value: 20,
  },
  {
    color: 'green',
    value: 40,
  },
  {
    color: 'purple',
    value: 40,
  },
  {
    color: 'purple',
    value: 50,
  },
  {
    color: 'yellow',
    value: 50,
  },
];
// Pop culture
export const StaticPie2Data = [
  {
    color: 'red',
    value: 10,
  },
  {
    color: 'blue',
    value: 10,
  },
  {
    color: 'blue',
    value: 20,
  },
  {
    color: 'green',
    value: 20,
  },
  {
    color: 'green',
    value: 40,
  },
  {
    color: 'purple',
    value: 40,
  },
  {
    color: 'purple',
    value: 50,
  },
  {
    color: 'yellow',
    value: 50,
  },
];
