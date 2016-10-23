import React, { PropTypes } from 'react';

import Chart from './Chart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.store,
      yAxis: "height",
      course: 1,
    };
  }

  render() {
    return (
      <div>
        <Chart
          data={this.state.data}
          yAxis={this.state.yAxis}
          course={this.state.course}
        />
      </div>
    );
  }
}

App.propTypes = {
  store: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
    })
  )
    .isRequired,
};

export default App;
