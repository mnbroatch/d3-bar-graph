import React, { PropTypes } from 'react';

import Chart from './Chart';

const App = ({ store }) => (
    <Chart data={store} />
);

App.propTypes = {
  store: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      age: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
      score1: PropTypes.number.isRequired,
      score2: PropTypes.number.isRequired,
      score3: PropTypes.number.isRequired,
      score4: PropTypes.number.isRequired,
    })
  )
    .isRequired,
};

export default App;
