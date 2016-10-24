import React, { PropTypes } from 'react';

const ChartBottomControls = (props) => {
  //  all prop keys besides changeXAxis are field names
  let fields = Object.keys(props).filter(el => el !== 'changeXAxis');

  let controls = fields.map(field => (
    <div key={field}>
      <button onClick={ () => props.changeXAxis(field) }>
        {field}
      </button>
    </div>
  ));

    return (
      <div className="bottom-controls" >
        {controls}
      </div>
    )
}

export default ChartBottomControls;
