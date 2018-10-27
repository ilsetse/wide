import React from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';

export default function KeywordChart(props) {
  return (
    <BubbleChart
      graph={{
        zoom: 0.5,
        offsetX: -0.4,
      }}
      width={1000}
      height={600}
      showLegend={true} // optional value, pass false to disable the legend.
      legendPercentage={10} // number that represent the % of with that legend going to use.
      legendFont={{
        size: 12,
        color: '#000',
        weight: 'bold',
      }}
      valueFont={{
        size: 12,
        color: '#fff',
        weight: 'bold',
      }}
      labelFont={{
        size: 16,
        color: '#fff',
        weight: 'bold',
      }}
      data={[
        {label: 'tekoäly', value: 1},
        {label: 'koneoppiminen', value: 1},
        {label: 'Machine learning', value: 1},
        {label: 'AI', value: 3},
        {label: 'Deep learning', value: 5},
        {label: 'Neural networks', value: 6},
      ]}
    />
  );
}
