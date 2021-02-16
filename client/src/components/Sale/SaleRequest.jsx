/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import getEther from '../ethersHelper';

function SaleRequest(props) {
  const { setLoading, exists, setExists, setError } = props;

  const [, signer, erc20] = getEther();

  const requestAllowance = async () => {
    setLoading(true);
    try {
      await erc20.requestAllowance(signer.getAddress());
      await erc20.on('AllowanceCreated', () => {
        setExists(true);
        setLoading(false);
      });
    } catch (err) {
      if (typeof err.data !== 'undefined') setError(() => err.data.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    requestAllowance();
  };

  return (
    <div className="sale--request">
      <h2 className="sale--request-title">
        Currently
        {exists ? ' ' : <strong> not </strong>}
        waiting to receive allowance
      </h2>
      <hr className="sale--request-divider" />
      <form className="sale--request-form" onSubmit={handleSubmit}>
        <button
          className="sale--request-button"
          disabled={exists}
          type="submit"
        >
          Request Allowance
        </button>
      </form>
    </div>
  );
}
SaleRequest.propTypes = {
  setLoading: PropTypes.func.isRequired,
  exists: PropTypes.bool.isRequired,
  setExists: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default SaleRequest;
