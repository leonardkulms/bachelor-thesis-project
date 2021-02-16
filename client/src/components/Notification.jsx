import React from 'react';
import PropTypes from 'prop-types';

// Notification to user that transaction sent to blockchain
function Notification(props) {
  const { text } = props;
  return <div>{text}</div>;
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Notification;
