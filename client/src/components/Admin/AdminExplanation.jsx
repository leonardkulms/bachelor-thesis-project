import React, { useState } from 'react';
import ShowMore from '../ShowMore';

function AdminExplanation() {
  const [shown, setShown] = useState(true);

  function toggleShown() {
    setShown((state) => !state);
  }

  return (
    <div className={`admin--explanation ${shown ? '' : 'hidden'}`}>
      <div className="admin--explanation-header">
        <div />
        <ShowMore
          shown={shown}
          toggleShown={toggleShown}
          className="sale--dashboard-button"
        />
      </div>
      <p className="admin--explanation-body">
        If you&apos;re reading this, you&apos;re the owner of the AvoToken
        Contract.
        <br />
        This is a small controlling board for you.
        <br />
        It enables you to allow other wallets ("beneficiaries") to buy tokens in
        the sale. Before you allow it, no one can buy any tokens (even you
        yourself.). By buying a token in the sale, the buyer transfers ethers to
        the contract. The contract saves these ethers and transfers AvoTokens to
        the buyer that you owned before.
        <br />
      </p>
    </div>
  );
}

export default AdminExplanation;
