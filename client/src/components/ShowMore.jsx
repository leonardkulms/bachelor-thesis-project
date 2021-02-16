import React from 'react';
import PropTypes from 'prop-types';

function ShowMore(props) {
  const { className, shown, toggleShown } = props;

  return (
    <button className={className} type="button" onClick={() => toggleShown()}>
      {shown ? 'Show Less' : 'Show More'}
    </button>
  );
}

ShowMore.propTypes = {
  className: PropTypes.string.isRequired,
  shown: PropTypes.bool.isRequired,
  toggleShown: PropTypes.func.isRequired,
};

export default ShowMore;
