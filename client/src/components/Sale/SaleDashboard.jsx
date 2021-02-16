import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import ShowMore from '../ShowMore';

import getEther from '../ethersHelper';

function SaleDashboard(props) {
  const { allowedAmount } = props;

  const [coinSymbol, setCoinSymbol] = useState('Nil');
  const [walletAddress, setWalletAddress] = useState('0x00');
  const [avoBalance, setAvoBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [shown, setShown] = useState(true);

  const [provider, signer, erc20] = getEther();

  function toggleShown() {
    setShown((state) => !state);
  }

  useEffect(() => {
    // Sets symbol of ERC20 token => AVO
    const getSymbol = async () => erc20.symbol();
    const symbol = getSymbol();
    symbol.then((x) => setCoinSymbol(x.toString()));

    // Sets current balance of AVO for user
    signer
      .getAddress()
      .then((response) => {
        setWalletAddress(response);
        return erc20.balanceOf(response);
      })
      .then((balance) => {
        setAvoBalance(balance.toString());
      });

    // Sets current balance of Eth for user
    signer
      .getAddress()
      .then((response) => provider.getBalance(response))
      .then((balance) => {
        const formattedBalance = ethers.utils.formatUnits(balance, 18);
        setEthBalance(formattedBalance.toString());
      });
  }, [provider, signer, erc20]);

  return (
    <div className={`sale--dashboard ${shown ? '' : 'hidden'}`}>
      <h2 className="sale--dashboard-title">
        {`Your ${coinSymbol} Dashboard`}
        <ShowMore
          shown={shown}
          toggleShown={toggleShown}
          className="sale--dashboard-button"
        />
      </h2>
      <hr className="sale--dashboard-divider" />
      <ul className="sale--dashboard-list">
        <li className="sale--dashboard-item">{walletAddress}</li>
        <li className="sale--dashboard-item">
          {`You own ${ethBalance} Ether`}
        </li>
        <li className="sale--dashboard-item">{`You own ${avoBalance} AVO`}</li>
        <li className="sale--dashboard-item">
          {`Your allowance is set to ${allowedAmount.toString()} `}
        </li>
      </ul>
    </div>
  );
}

SaleDashboard.propTypes = {
  allowedAmount: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
};

export default SaleDashboard;
