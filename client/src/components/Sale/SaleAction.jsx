import React from 'react';
import PropTypes from 'prop-types';

function SaleAction(props) {
  const { setTransAmount, buyAVO, sellAVO } = props;

  // Sets state for value to be transacted
  function valueChange(value) {
    setTransAmount(value);
  }

  // Handles user buy form submit
  const handleBuySubmit = (e) => {
    e.preventDefault();
    valueChange(e.target.buyavo.value);
    buyAVO();
  };

  // Handles user sell form submit
  const handleSellSubmit = (e) => {
    e.preventDefault();
    valueChange(e.target.sellavo.value);
    sellAVO();
  };

  return (
    <div className="sale--action">
      <h1 className="sale--action-title">Get some more AVO!</h1>
      <hr className="sale--action-divider" />
      <ul className="sale--action-list">
        <li className="sale--action-item">
          <form className="sale--action-form" onSubmit={handleBuySubmit}>
            <label htmlFor="buyavo">
              AVO to buy:
              <div className="sale--action-field">
                <input
                  className="sale--action-input"
                  type="number"
                  step="1"
                  min="0"
                  id="buyavo"
                  name="buyavo"
                  onChange={(e) => valueChange(e.target.value)}
                  required
                />
                <button className="sale--action-button" type="submit">
                  Buy
                </button>
              </div>
            </label>
          </form>
        </li>

        <li className="sale--action-item">
          <form className="sale--action-form" onSubmit={handleSellSubmit}>
            <label htmlFor="sellavo">
              AVO to sell:
              <div className="sale--action-field">
                <input
                  className="sale--action-input"
                  type="number"
                  step="1"
                  min="0"
                  id="sellavo"
                  name="sellavo"
                  onChange={(e) => valueChange(e.target.value)}
                  required
                />
                <button className="sale--action-button" type="submit">
                  Sell
                </button>
              </div>
            </label>
          </form>
        </li>
      </ul>
    </div>
  );
}

SaleAction.propTypes = {
  setTransAmount: PropTypes.func.isRequired,
  buyAVO: PropTypes.func.isRequired,
  sellAVO: PropTypes.func.isRequired,
};

export default SaleAction;
