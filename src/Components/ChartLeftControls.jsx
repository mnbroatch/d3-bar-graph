import React, { PropTypes } from 'react';

const buttonLabels = {
  age: 'Age',
  height: 'Height',
  weight: 'Weight',
};

const ChartLeftControls = (props) => {
  //  all prop keys besides changeYAxis and yAxis are field names
  let fields = Object.keys(props).filter(el => el !== 'changeYAxis' && el !== 'yAxis');

  let controls = fields.map(field => (
    <div key={field}>
      <button className="left-controls__button" onClick={ () => props.changeYAxis(field) }>
        {buttonLabels[field]}
      </button>
    </div>
  ));

    return (
      <div className="left-controls" >
        {controls}
      </div>
    )
}

export default ChartLeftControls;
