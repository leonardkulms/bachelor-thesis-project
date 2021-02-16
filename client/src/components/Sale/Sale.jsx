import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SaleDashboard from './SaleDashboard';
import SaleAction from './SaleAction';
import SaleHistory from './SaleHistory';
import SaleRequest from './SaleRequest';
import ErrorNotification from '../ErrorNotification';
import LoadingBar from '../LoadingBar';
import getEther from '../ethersHelper';

function Sale() {
  const [transAmount, setTransAmount] = useState('0');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [sellHistory, setSellHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [exists, setExists] = useState(false);
  const [allowedAmount, setAllowedAmount] = useState(0);

  const [, signer, erc20, noProvider] = getEther();

  async function updateHistory() {
    let purchaseEvents = await erc20.queryFilter('AVOBuyEvent');
    purchaseEvents = purchaseEvents.map((elem) => elem.args);
    let sellEvents = await erc20.queryFilter('AVOSellEvent');
    sellEvents = sellEvents.map((elem) => elem.args);
    if (isMounted) {
      setPurchaseHistory(purchaseEvents);
      setSellHistory(sellEvents);
    }
  }

  async function getAllowance() {
    const addr = await signer.getAddress();
    const newExists = await erc20.exists(addr);
    setExists(newExists);
    if (exists) {
      const amount = await erc20.getAllowanceAmount(addr);
      setAllowedAmount(amount);
    }
  }

  useEffect(() => {
    setIsMounted(true);
    if (!noProvider) {
      updateHistory();
      getAllowance();
    }
    return () => setIsMounted(false);
    // eslint-disable-next-line
  }, [exists, loading]);

  useEffect(() => {
    setLoading(false);
  }, [sellHistory.length, purchaseHistory.length]);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 1000);
  }, [error]);

  // Interacts with smart contract to buy AVO
  async function buyAVO() {
    // Converts integer as Eth to Wei,
    const amount = await ethers.utils.parseEther(transAmount.toString());
    try {
      setLoading(true);
      await erc20.buyToken(transAmount, { value: amount });
      // Listens for event on blockchain
      await erc20.on('AVOBuyEvent', () => {
        updateHistory();
      });
    } catch (err) {
      if (typeof err.data !== 'undefined') setError(err.data.message);
      setLoading(false);
    }
  }

  // Interacts with smart contract to sell AVO
  async function sellAVO() {
    try {
      setLoading(true);
      await erc20.sellToken(transAmount);
      // Listens for event on blockchain
      await erc20.on('AVOSellEvent', () => {
        updateHistory();
        setLoading(false);
      });
    } catch (err) {
      if (typeof err.data !== 'undefined') setError(err.data.message);
      setLoading(false);
    }
  }

  return (
    <div className="sale">
      {loading ? <LoadingBar /> : ''}
      <SaleDashboard allowedAmount={allowedAmount} />
      {allowedAmount > 0 ? (
        <SaleAction
          buyAVO={buyAVO}
          sellAVO={sellAVO}
          setTransAmount={setTransAmount}
        />
      ) : (
        <SaleRequest
          setLoading={setLoading}
          exists={exists}
          setExists={setExists}
          setError={setError}
        />
      )}
      {exists ? (
        <SaleHistory
          purchaseHistory={purchaseHistory}
          sellHistory={sellHistory}
        />
      ) : (
        ''
      )}

      {error.length > 0 && <ErrorNotification errMsg={error} />}
    </div>
  );
}

export default Sale;
