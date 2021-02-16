import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Notification from '../Notification';

function SaleHistoryColumn(props) {
  const { historyList } = props;

  const prettyHistoryList = historyList.map((elem) => (
    <li key={uuidv4()} className="sale--history-item">
      <Notification
        text={`${elem.amount.toString()} AVO have been transferred from ${
          elem.from
        } to ${elem.to}`}
      />
    </li>
  ));

  if (prettyHistoryList.length > 0) {
    return (
      <ul className="sale--history-list">{prettyHistoryList.reverse()}</ul>
    );
  }
  return (
    <h3 className="sale--history-message">
      None yet.
      <br />
      Make the first one!
    </h3>
  );
}

SaleHistoryColumn.propTypes = {
  historyList: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default SaleHistoryColumn;
