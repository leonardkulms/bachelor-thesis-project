import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AdminForm(props) {
  const { handleIncrease, handleDecrease } = props;
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('inc');
  const [beneficiary, setBeneficiary] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (method === 'inc') {
      handleIncrease(beneficiary, amount);
    } else {
      handleDecrease(beneficiary, amount);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-field">
        <label htmlFor="amount" className="admin-label">
          Amount:
          <input
            id="amount"
            type="number"
            start="10"
            step="1"
            placeholder="10"
            value={amount}
            className="admin-input"
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </label>
      </div>

      <div className="admin-field">
        <label htmlFor="beneficiary" className="admin-label">
          Beneficiary Address:
          <input
            id="beneficiary"
            placeholder="0x0"
            value={beneficiary}
            className="admin-input"
            onChange={(event) => setBeneficiary(event.target.value)}
            required
          />
        </label>
      </div>

      <div className="admin-radiofield">
        <label htmlFor="inc" className="admin--label">
          <input
            id="inc"
            type="radio"
            name="method"
            value="inc"
            checked={method === 'inc'}
            onChange={(event) => setMethod(event.target.value)}
          />
          Increase
        </label>
      </div>

      <div className="admin-radiofield">
        <label htmlFor="dec" className="admin--label">
          <input
            id="dec"
            type="radio"
            name="method"
            value="dec"
            checked={method === 'dec'}
            onChange={(event) => setMethod(event.target.value)}
          />
          Decrease
        </label>
      </div>
      <div className="admin-field">
        <button className="admin-button" type="submit">
          Change Allowance
        </button>
      </div>
    </form>
  );
}

AdminForm.propTypes = {
  handleIncrease: PropTypes.func.isRequired,
  handleDecrease: PropTypes.func.isRequired,
};

export default AdminForm;
