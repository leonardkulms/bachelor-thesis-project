import React, { useState, useEffect } from 'react';

import AdminForm from './AdminForm';
import AdminOverview from './AdminOverview';
import ErrorNotification from '../ErrorNotification';
import getEther from '../ethersHelper';
import LoadingBar from '../LoadingBar';
import NotAdmin from './NotAdmin';
import AdminExplanation from './AdminExplanation';

function Admin() {
  const [allowanceIncreases, setAllowanceIncreases] = useState([]);
  const [allowanceDecreases, setAllowanceDecreases] = useState([]);
  const [access, setAccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [, signer, erc20, noProvider] = getEther();

  async function getAllowances() {
    let increases = await erc20.queryFilter('AllowanceIncrease');
    increases = increases.map((elem) => elem.args);
    let decreases = await erc20.queryFilter('AllowanceDecrease');
    decreases = decreases.map((elem) => elem.args);
    setAllowanceIncreases(increases);
    setAllowanceDecreases(decreases);
  }

  useEffect(() => {
    async function verifyAccess() {
      try {
        const acc = await erc20.verifyOwner();
        setAccess(acc);
      } catch (err) {
        if (typeof err.data !== 'undefined') setError(() => err.data.message);
      }
    }
    verifyAccess();
    if (!noProvider) getAllowances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 2500);
  }, [error]);

  useEffect(() => {
    setLoading(false);
  }, [allowanceIncreases.length, allowanceDecreases.length]);

  async function increaseAllowance(address, amount) {
    try {
      setLoading(true);
      await erc20.incAllowance(address, amount, { from: signer.getAddress() });
      await erc20.on('AllowanceIncrease', () => {
        getAllowances();
      });
    } catch (err) {
      if (typeof err.data !== 'undefined') setError(() => err.data.message);
      setLoading(false);
    }
  }

  async function decreaseAllowance(address, amount) {
    try {
      setLoading(true);
      await erc20.decAllowance(address, amount, { from: signer.getAddress() });
      await erc20.on('AllowanceDecrease', () => {
        getAllowances();
      });
    } catch (err) {
      if (typeof err.data !== 'undefined') setError(() => err.data.message);
      setLoading(false);
    }
  }

  if (access) {
    return (
      <div className="admin">
        {loading ? <LoadingBar /> : ''}
        <AdminExplanation />
        <AdminForm
          handleIncrease={increaseAllowance}
          handleDecrease={decreaseAllowance}
        />
        <AdminOverview />
        {error.length > 0 && <ErrorNotification errMsg={error} />}
      </div>
    );
  }
  return (
    <div>
      <NotAdmin />
      {error.length > 0 && <ErrorNotification errMsg={error} />}
    </div>
  );
}

export default Admin;
