const d3 = require('d3');

//  in the future, margin and font size should be a
//  function of chart size
const margin = { left: 80, bottom: 80, right: 40, top: 40 };
const barWidthFactor = 0.05;

const d3Chart = {};

const axisLabels = {
  age: 'Judge age',
  height: 'Judge Height (cm)',
  weight: 'Judge Weight (kg)',
  score1: 'Score after course 1',
  score2: 'Score after course 2',
  score3: 'Score after course 3',
  score4: 'Score after course 4',
};

d3Chart.create = function create(el, state) {
  const svg = d3.select(el).append('svg')
    .attr('class', 'd3-chart__svg')
    .attr('width', '100%')
    .attr('height', '100%');

  svg.append('g')
    .attr('class', 'd3-chart__svg__bars')
    .attr('width', el.offsetWidth - margin.left - margin.right)
    .attr('height', el.offsetHeight - margin.top - margin.bottom)
    .attr('transform', `translate(${margin.left},-${margin.bottom})`);


  if (state.data) this.update(el, state);
};

d3Chart.update = function update(el, state) {
  // Re-compute the scales, and render the data points
  const scales = this.scale(el, state);
  this.drawAxes(el, scales, state);
  this.drawBars(el, scales, state);
};

d3Chart.scale = function scale(el, state) {
  const y = d3.scaleLinear()
    .range([0, el.offsetHeight - margin.top - margin.bottom])
    .domain([0, this.getMaxHeight(state)]);

  //  ugly -- fix later
  const yReverse = d3.scaleLinear()
    .range([el.offsetHeight - margin.top - margin.bottom, 0])
    .domain([0, this.getMaxHeight(state)]);

  const x = d3.scaleLinear()
    .range([0, el.offsetWidth - margin.left - margin.right])
    .domain([0, 10]);

  return { x, y, yReverse };
};

d3Chart.drawAxes = (el, scale, state) => {
  const axisLeft = d3.axisLeft(scale.yReverse);
  const axisBottom = d3.axisBottom(scale.x);
  const t = d3.transition()
    .duration(750);

  const svg = d3.select('.d3-chart__svg');

  if (d3.select('.d3-chart__svg__axis').empty()) {
    svg.append('g')
      .attr('class', 'd3-chart__svg__axis d3-chart__svg__axis--y')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(axisLeft);

    svg.append('g')
      .attr('class', 'd3-chart__svg__axis d3-chart__svg__axis--x')
      .attr('transform', `translate(${margin.left}, ${el.offsetHeight - margin.bottom})`)
      .call(axisBottom);

    svg.append('text')
      .attr('class', 'd3-chart__svg__axis-label d3-chart__svg__axis-label--y ')
      .attr('text-anchor', 'middle')
      .text(axisLabels[state.yAxis])
      .attr('transform', `translate(${margin.left / 2.5}, ${el.offsetHeight / 2}) rotate(-90)`);

    svg.append('text')
      .attr('class', 'd3-chart__svg__axis-label d3-chart__svg__axis-label--x ')
      .attr('text-anchor', 'middle')
      .text(axisLabels[state.xAxis])
      .attr('transform', `translate(${el.offsetWidth / 2}, ${el.offsetHeight - (margin.bottom / 2.5)})`);
  }

  d3.select('.d3-chart__svg__axis--y')
    .transition(t)
    .call(axisLeft);

  d3.select('.d3-chart__svg__axis--x')
    .transition(t)
    .call(axisBottom);

  d3.select('.d3-chart__svg__axis-label--y')
    .text(axisLabels[state.yAxis]);

  d3.select('.d3-chart__svg__axis-label--x')
    .text(axisLabels[state.xAxis]);
};

d3Chart.drawBars = (el, scale, state) => {
  const t = d3.transition()
    .duration(750);

  const barWidth = el.offsetWidth * barWidthFactor;

  //  keep track of tops of stacks of bars so bars can stack further
  const heightMap = {};

  const g = d3.select(el).selectAll('.d3-chart__svg__bars');

  const bar = g.selectAll('.d3-chart__svg__bar')
    .data(state.data, judge => judge.id);


  bar.enter().append('rect')
    .attr('class', judge => `d3-chart__svg__bar d3-chart__svg__bar--${judge.color}`)
    .attr('width', barWidth)
    .merge(bar)
    .transition(t)
    .attr('height', judge => scale.y(judge[state.yAxis]) - 3)
    .attr('x', judge => scale.x(judge[state.xAxis]) - (barWidth / 2))
    .attr('y', (judge) => {
      const score = judge[state.xAxis];
      const oldHighest = heightMap[score] || 0;
      const newHighest = (oldHighest + judge[state.yAxis]);

      heightMap[score] = newHighest;

      return (el.offsetHeight - scale.y(newHighest));
    });

  bar.exit().remove();
};

d3Chart.getMaxHeight = (state) => {
  const heightMap = {};
  state.data.forEach((judge) => {
    const score = judge[state.xAxis];
    const val = judge[state.yAxis];
    heightMap[score] = heightMap[score] ?
      heightMap[score] + val
      : val;
  });
  return Math.max(...Object.values(heightMap));
};


module.exports = d3Chart;
