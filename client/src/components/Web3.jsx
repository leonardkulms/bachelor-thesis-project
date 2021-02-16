import React from 'react';
import getEther from './ethersHelper';

function Web3(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const [, , , noProvider] = getEther();

  // Aborts app if metamask etc not present
  // TODO build nice error page
  if (noProvider) {
    return (
      <div className="landing">
        <div className="landing--wit">
          <h1>
            Looks like you&apos;re still browsing in Web2. How would you like
            exploring Web3?
          </h1>
          <a
            href="https://metamask.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Metamask required.</p>
          </a>
        </div>
        <div className="landing--scene metamask" />
      </div>
    );
  }
  return <div>{children}</div>;
}

export default Web3;
