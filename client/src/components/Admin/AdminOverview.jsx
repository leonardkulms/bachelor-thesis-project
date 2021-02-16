/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ShowMore from '../ShowMore';
import getEther from '../ethersHelper';

function AdminOverview() {
  const [allowances, setAllowances] = useState([]);
  const [shown, setShown] = useState(false);

  const [, , erc20] = getEther();

  useEffect(() => {
    async function getAllowances() {
      const count = await erc20.getAllowancesCount();
      for (let i = 0; i < count; i += 1) {
        const addr = await erc20.allowancesList(i);
        const amount = await erc20.getAllowanceAmount(addr);
        const newAllowance = {
          address: addr,
          allowedAmount: amount,
        };
        setAllowances((oldState) => [...oldState, newAllowance]);
      }
    }
    getAllowances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listItems = allowances.map((allowance) => (
    <li key={uuidv4()} className="admin--overview-item">
      Address:
      {allowance.address}
      <br />
      Allowed:
      {allowance.allowedAmount.toString()}
    </li>
  ));

  function toggleShown() {
    setShown(!shown);
  }

  return (
    <div className={`admin--overview ${shown ? '' : 'hidden'}`}>
      <div className="admin--overview-header">
        <h3>Allowance Overview</h3>
        <ShowMore
          toggleShown={toggleShown}
          shown={shown}
          className="admin--overview-button"
        />
      </div>

      <ul className="admin--overview-list">{listItems}</ul>
    </div>
  );
}

export default AdminOverview;
