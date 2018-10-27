import React from 'react';
import Plot from 'react-plotly.js';

export default function Matrix(props) {
  const data = [
    {
      z: [
        [0, 115, 78, 58, 40, 40, 35, 33, 32, 26],
        [115, 0, 31, 50, 18, 22, 8, 4, 16, 17],
        [78, 31, 0, 36, 19, 9, 6, 11, 11, 10],
        [58, 50, 36, 0, 17, 4, 0, 8, 12, 11],
        [40, 18, 19, 17, 0, 2, 2, 4, 8, 10],
        [40, 22, 9, 4, 2, 0, 5, 0, 1, 3],
        [35, 8, 6, 0, 2, 5, 0, 4, 2, 2],
        [33, 4, 11, 8, 4, 0, 4, 0, 8, 1],
        [32, 16, 11, 12, 8, 1, 2, 8, 0, 5],
        [26, 17, 10, 11, 10, 3, 2, 1, 5, 0],
      ],
      x: [
        'eeg',
        'electroencephalography',
        'aivot',
        'brain',
        'meg',
        'epilepsia',
        'lapset',
        'neuropsykologia',
        'aivotutkimus',
        'aivokuori',
      ],
      y: [
        'eeg',
        'electroencephalography',
        'aivot',
        'brain',
        'meg',
        'epilepsia',
        'lapset',
        'neuropsykologia',
        'aivotutkimus',
        'aivokuori',
      ],
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
