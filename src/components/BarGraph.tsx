import { FC } from 'react';
import Plot from 'react-plotly.js';

export const BarGraph: FC<{ analytics: any }> = ({ analytics }) => {

  return (
    <Plot
      data={[
        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
    />
  )
}
