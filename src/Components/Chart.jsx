import React, { PropTypes } from 'react';

import d3Chart from '../d3/d3Chart';
import ChartLeftControls from './ChartLeftControls';
import ChartBottomControls from './ChartBottomControls';

let d3 = require('d3');

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
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

    d3.csv('./data.csv',
      datum => {
        return {
          id: +datum['Judge id'],
          age: +datum['Judge age'],
          height: +datum['Judge Height (cm)'],
          weight: +datum['Judge Weight (kg)'],
          color: datum['Clothes Color'].toLowerCase(),
          score1: +datum['Score after course 1'],
          score2: +datum['Score after course 2'],
          score3: +datum['Score after course 3'],
          score4: +datum['Score after course 4'],
        };
      },
      data => {
        this.setState({ data });
      });
  }

  componentDidUpdate() {
    console.log('update')
    var el = this.refs.d3ChartRef;
    d3Chart.update(el, this.state);
  }


  //  for now we have to pass field names in as props
  //  with axis labels as the values.
  //  Changing shape of data could eliminate this step
  render() {
    return (
      <div className="d3-chart">
        <ChartLeftControls
          changeYAxis={this.changeYAxis}
          yAxis={this.state.yAxis}
          age
          height
          weight
        />
        <div ref="d3ChartRef" className={"d3-chart__container"} />
        <br />
        <ChartBottomControls
          changeXAxis={this.changeXAxis}
          xAxis={this.state.xAxis}
          score1
          score2
          score3
          score4
        />
      </div>
    );
  }
}

export default Chart;
