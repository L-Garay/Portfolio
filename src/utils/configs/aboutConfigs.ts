import theme from '../../styles/theme';

export const BarChartFMConfig = [
  {
    name: 'FM 16',
    percentageFill: 26.6,
    barColor: `${theme.colors.BLUE_1}`,
    arrowColor: `${theme.colors.ORANGE_1}`,
  },
  {
    name: 'FM 18',
    percentageFill: 19.2,
    barColor: `${theme.colors.ORANGE_1}`,
    arrowColor: `${theme.colors.BLUE_1}`,
  },
  {
    name: 'FM 17',
    percentageFill: 12.2,
    barColor: `${theme.colors.BLUE_5}`,
    arrowColor: `${theme.colors.ORANGE_2}`,
  },
  {
    name: 'FM 20',
    percentageFill: 7.9,
    barColor: `${theme.colors.ORANGE_3}`,
    arrowColor: `${theme.colors.BLUE_2}`,
  },
  {
    name: 'FM 14',
    percentageFill: 6,
    barColor: `${theme.colors.BLUE_7}`,
    arrowColor: `${theme.colors.ORANGE_3}`,
  },
  {
    name: 'Others (6)',
    percentageFill: 28.1,
    barColor: `${theme.colors.ORANGE_3}`,
    arrowColor: `${theme.colors.BLUE_5}`,
  },
];

export const DonutConfig = [
  {
    percentageFill: 54,
    circleColor1: `${theme.colors.BLUE_1}`,
    circleColor2: `${theme.colors.BLUE_1}`,
    linearGradientId: 'donut1',
    name: 'D3.js',
  },
  {
    percentageFill: 93,
    circleColor1: `${theme.colors.ORANGE_1}`,
    circleColor2: `${theme.colors.ORANGE_1}`,
    linearGradientId: 'donut2',
    name: 'Three.js',
  },
  {
    percentageFill: 66,
    circleColor1: `${theme.colors.BLUE_2}`,
    circleColor2: `${theme.colors.BLUE_2}`,
    linearGradientId: 'donut3',
    name: 'Python',
  },
  {
    percentageFill: 48,
    circleColor1: `${theme.colors.ORANGE_2}`,
    circleColor2: `${theme.colors.ORANGE_2}`,
    linearGradientId: 'donut4',
    name: 'Java',
  },
  {
    percentageFill: 81,
    circleColor1: `${theme.colors.BLUE_5}`,
    circleColor2: `${theme.colors.BLUE_5}`,
    linearGradientId: 'donut5',
    name: 'Svelte',
  },
  {
    percentageFill: 17,
    circleColor1: `${theme.colors.ORANGE_3}`,
    circleColor2: `${theme.colors.ORANGE_3}`,
    linearGradientId: 'donut6',
    name: 'Unity',
  },
];
