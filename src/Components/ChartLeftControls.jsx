import React, { PropTypes } from 'react';

const ChartLeftControls = (props) => {
  //  all prop keys besides changeYAxis are field names
  let fields = Object.keys(props).filter(el => el !== 'changeYAxis');

  console.log(fields)

    return (
      <div>
        asdlaskjdalskdj 
      </div>
    )
}

export default ChartLeftControls;
