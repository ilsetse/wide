import React from 'react';
import Plot from 'react-plotly.js';
import DataProcessor from './DataProcessor';

export default function KeywordChart(props) {
  const processed = DataProcessor(props.data);
  return <Plot {...processed} />;
}
