import React, { PropTypes } from 'react';

const App = (store) => (
  <div>
    hey there
  </div>
);

App.propTypes = {
  store: PropTypes.object.isRequired, //  eslint-disable-line react/forbid-prop-types
};

export default App;
