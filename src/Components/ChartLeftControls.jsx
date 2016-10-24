import React, { PropTypes } from 'react';

const ChartLeftControls = (props) => {
  //  all prop keys besides changeYAxis are field names
  let fields = Object.keys(props).filter(el => el !== 'changeYAxis');

  let controls = fields.map(field => (
    <div key={field}>
      <button onClick={ () => props.changeYAxis(field) }>
        {field}
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
