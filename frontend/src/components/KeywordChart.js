import React from 'react';
import Plot from 'react-plotly.js';
import DATA from './data';
import DataProcessor from './DataProcessor';

export default function KeywordChart(props) {
  const processed = DataProcessor(DATA);
  return <Plot {...processed} />;
}
