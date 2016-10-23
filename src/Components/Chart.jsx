import React, { PropTypes } from 'react';

import d3Chart from '../d3/d3Chart';
import d3ChartLeftControls from './ChartLeftControls';
// import d3ChartBottomControls from './ChartBottomControls';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      yAxis: 'age',
      course: 1,
    };
    this.changeYAxis = this.changeYAxis.bind(this);
    this.changeCourse = this.changeCourse.bind(this);
  }

  changeYAxis(yAxis) {
    this.setState({ yAxis });
  }

  changeCourse(course) {
    this.setState({ course });
  }

  componentDidMount() {
    var el = this.refs.d3ChartRef;
    d3Chart.create(el, this.state);
  }

  render() {
    return (
      <div className="d3-chart">
        <d3ChartLeftControls />
        <div ref="d3ChartRef" className={"d3-chart__container"} />
      </div>
    );
  }
}

export default Chart;
