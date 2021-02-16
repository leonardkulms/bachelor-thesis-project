import React from 'react';
import PropTypes from 'prop-types';

// Notification to user of blockchain error
function ErrorNotification(props) {
  const { errMsg } = props;
  return <div className="sale--error">{errMsg}</div>;
}

ErrorNotification.propTypes = {
  errMsg: PropTypes.string.isRequired,
};

export default ErrorNotification;
