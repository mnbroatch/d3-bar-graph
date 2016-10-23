import React, { PropTypes } from 'react';

import d3Chart from '../d3/d3Chart';
import ChartLeftControls from './ChartLeftControls';
// import d3ChartBottomControls from './ChartBottomControls';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      yAxis: 'age',
      xAxis: 'score1',
    };
    this.changeYAxis = this.changeYAxis.bind(this);
    this.changeXAxis = this.changeXAxis.bind(this);
  }

  changeYAxis(yAxis) {
    this.setState({ yAxis });
  }

  changeXAxis(xAxis) {
    this.setState({ xAxis });
  }

  componentDidMount() {
    var el = this.refs.d3ChartRef;
    d3Chart.create(el, this.state);
  }

  //  for now we have to pass field names in as props.
  //  changing shape of data could eliminate this step
  render() {
    return (
      <div className="d3-chart">
        <ChartLeftControls
          changeYAxis={this.changeYAxis}
          height
          age
          weight
        />
        <div ref="d3ChartRef" className={"d3-chart__container"} />
      </div>
    );
  }
}

export default Chart;
