import React from 'react';
import { Link } from '@reach/router';

import Logo from './Logo';

function Nav() {
  return (
    <nav className="nav">
      <Logo />
      <div className="nav--links">
        <Link className="nav--link" to="/">
          Landing
        </Link>
        <Link className="nav--link" to="app/admin">
          Admin
        </Link>
        <Link className="nav--link" to="app/sale">
          Sale
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
