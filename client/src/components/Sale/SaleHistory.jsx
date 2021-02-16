import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SaleHistoryColumn from './SaleHistoryColumn';
import ShowMore from '../ShowMore';

function SaleHistory(props) {
  const { purchaseHistory, sellHistory } = props;
  const [shown, setShown] = useState(false);

  function toggleShown() {
    setShown(!shown);
  }

  return (
    <div className={`sale--history ${shown ? '' : 'hidden'}`}>
      <div className="sale--history-hide">
        <ShowMore
          className="sale--history-button"
          toggleShown={toggleShown}
          shown={shown}
        />
      </div>
      <div className="sale--history-section">
        <h2 className="sale--history-title">Purchases</h2>
        <hr className="sale--history-divider" />
        <SaleHistoryColumn historyList={purchaseHistory} />
      </div>
      <div className="sale--history-section">
        <h2 className="sale--history-title">Sells</h2>
        <hr className="sale--history-divider" />
        <SaleHistoryColumn historyList={sellHistory} />
      </div>
    </div>
  );
}

SaleHistory.propTypes = {
  purchaseHistory: PropTypes.arrayOf(PropTypes.array).isRequired,
  sellHistory: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default SaleHistory;
