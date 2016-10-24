let d3 = require('d3');

//  in the future, margin and font size should be a
//  function of chart size
const margin = {left: 80, bottom: 80, right: 40, top: 40}
const barWidthFactor = .05;

const d3Chart = {};

d3Chart.create = function (el, state) {
  const svg = d3.select(el).append('svg')
    .attr('class', 'd3-chart__svg')
    .attr('width', '100%')
    .attr('height',  '100%');

  svg.append('g')
    .attr('class', 'd3-chart__svg__bars')
    .attr('width', el.offsetWidth - margin.left - margin.right)
    .attr('height', el.offsetHeight - margin.top - margin.bottom)
    .attr('transform', `translate(${margin.left},-${margin.bottom})`)


  if (state.data) this.update(el, state);
};

d3Chart.update = function (el, state) {
  // Re-compute the scales, and render the data points
  let scales = this._scale(el, state);
  this._drawAxes(el, scales, state);
  this._drawBars(el, scales, state);
};

d3Chart._scale = function (el, state) {
  let y = d3.scaleLinear()
    .range([0, el.offsetHeight - margin.top - margin.bottom])
    .domain([0, this.getMaxHeight(state)])

  //  ugly -- fix later
  let yReverse = d3.scaleLinear()
    .range([el.offsetHeight - margin.top - margin.bottom, 0])
    .domain([0, this.getMaxHeight(state)])

  let x = d3.scaleLinear()
    .range([0, el.offsetWidth - margin.left - margin.right])
    .domain([0, 10])

  return { x, y, yReverse }
}

d3Chart._drawAxes = function (el, scale, state) {
  let axisLeft = d3.axisLeft(scale.yReverse)
  let axisBottom = d3.axisBottom(scale.x)
  let t = d3.transition()
    .duration(750);

  const svg = d3.select('.d3-chart__svg')

  if(d3.select('.d3-chart__svg__axis').empty()) {
    svg.append("g")
      .attr('class', 'd3-chart__svg__axis d3-chart__svg__axis--y')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(axisLeft);

    svg.append("g")
      .attr('class', 'd3-chart__svg__axis d3-chart__svg__axis--x')
      .attr('transform', `translate(${margin.left}, ${el.offsetHeight - margin.bottom})`)
      .call(axisBottom);
  }

  d3.select('.d3-chart__svg__axis--y')
    .transition(t)
    .call(axisLeft);

  d3.select('.d3-chart__svg__axis--x')
    .transition(t)
    .call(axisBottom);

  svg.append('text')
    .text('y axis label')
    .attr('transform', `translate(${margin.left / 2.5}, ${el.offsetHeight / 2}) rotate(-90)`)

  svg.append('text')
    .text('x axis label')
    .attr('transform', `translate(${el.offsetWidth / 2}, ${el.offsetHeight - margin.bottom / 2.5})`)
}

d3Chart._drawBars = function (el, scale, state) {
  let t = d3.transition()
    .duration(750);

  let barWidth = el.offsetWidth * barWidthFactor;

  //  keep track of tops of stacks of bars so bars can stack further
  let heightMap = {};

  let g = d3.select(el).selectAll('.d3-chart__svg__bars');


  let bar = g.selectAll('.d3-chart__svg__bar')
    .data(state.data, judge => judge.id);


  bar.enter().append('rect')
    .attr('class', judge => `d3-chart__svg__bar d3-chart__svg__bar--${judge.color}`)
    .attr('width', barWidth)
    .merge(bar)
    .transition(t)
    .attr('height', judge => scale.y(judge[state.yAxis]) - 3)
    .attr('x', judge => scale.x(judge[state.xAxis]) - barWidth / 2)
    .attr('y', judge => {
      let score = judge[state.xAxis];
      let oldHighest = heightMap[score] || 0;
      let newHighest = (oldHighest + judge[state.yAxis]);

      heightMap[score] = newHighest;

      return (el.offsetHeight - scale.y(newHighest));
    })

  bar.exit().remove();
};


d3Chart.getMaxHeight = function (state) {
  let heightMap = {};
  state.data.forEach(judge => {
    let score = judge[state.xAxis];
    let val = judge[state.yAxis];
    heightMap[score] = heightMap[score] ?
      heightMap[score] + judge[state.yAxis] 
      : judge[state.yAxis]; 
  })
  return Math.max(...Object.values(heightMap));
}


module.exports = d3Chart;
