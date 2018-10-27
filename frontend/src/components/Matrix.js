import React from 'react';
import Plot from 'react-plotly.js';

export default function Matrix(props) {
  const [d] = Object.values(props.data);
  console.log(d);

  const data = [
    {
      z: d.data,
      x: d.label,
      y: d.label,
      colorscale: 'YIOrRd',
      type: 'heatmap',
    },
  ];

  const layout = {
    width: document.body.clientWidth - 64,
    height: 600,
  };

  return <Plot data={data} layout={layout} />;
}
