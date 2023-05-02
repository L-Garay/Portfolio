export const barChartOneData = [
  {
    name: 'item 1',
    percentageFill: 65,
    barColor: 'blue',
    arrowColor: 'orange',
  },
  {
    name: 'item 2',
    percentageFill: 27,
    barColor: 'red',
    arrowColor: 'white',
  },
  {
    name: 'item 3',
    percentageFill: 82,
    barColor: 'green',
    arrowColor: 'purple',
  },
  {
    name: 'item 4',
    percentageFill: 46,
    barColor: 'orange',
    arrowColor: 'black',
  },
];

export const barChartTwoData = [
  {
    name: 'item 5',
    percentageFill: 45,
    barColor: 'blue',
    arrowColor: 'orange',
  },
  {
    name: 'item 6',
    percentageFill: 87,
    barColor: 'red',
    arrowColor: 'white',
  },
  {
    name: 'item 7',
    percentageFill: 76,
    barColor: 'green',
    arrowColor: 'purple',
  },
  {
    name: 'item 8',
    percentageFill: 58,
    barColor: 'orange',
    arrowColor: 'black',
  },
  {
    name: 'item 9',
    percentageFill: 36,
    barColor: 'orange',
    arrowColor: 'black',
  },
  {
    name: 'item 10',
    percentageFill: 93,
    barColor: 'orange',
    arrowColor: 'black',
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
    strokeColor: 'orange',
    strokeDashValue: 75,
  },
  {
    name: 'slice 3',
    id: 'slice3',
    percentage: 15,
    strokeColor: 'red',
    strokeDashValue: 50,
  },
  {
    name: 'slice 4',
    id: 'slice4',
    percentage: 20,
    strokeColor: 'green',
    strokeDashValue: 40,
  },
  {
    name: 'slice 5',
    id: 'slice5',
    percentage: 20,
    strokeColor: 'purple',
    strokeDashValue: 20,
  },
];
