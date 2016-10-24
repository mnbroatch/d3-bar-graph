import React, { PropTypes } from 'react';

const buttonLabels = {
  score1: 'Course 1',
  score2: 'Course 2',
  score3: 'Course 3',
  score4: 'Course 4',
};

const ChartBottomControls = (props) => {
  //  all prop keys besides changeXAxis and xAxis are field names
  let fields = Object.keys(props).filter(el => el !== 'changeXAxis' && el !== 'xAxis');

  let controls = fields.map(field => (
      <button key={field} className="bottom-controls__button" onClick={ () => props.changeXAxis(field) }>
        {buttonLabels[field]}
      </button>
  ));

    return (
      <div className="bottom-controls">
        {controls}
      </div>
    )
}

export default ChartBottomControls;
