import React from 'react';

function NotAdmin() {
  return (
    <div className="notadmin">
      <div className="notadmin--scene" />
      <div className="notadmin--wit">
        <h1>You&apos;re not an admin.</h1>
        <h2>How did you get here?</h2>
      </div>
    </div>
  );
}

export default NotAdmin;
