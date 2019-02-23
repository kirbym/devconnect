import React from 'react';
import rainbowSpinner from '../../img/rainbowSpinner.gif';

export default function Spinner() {
  return (
    <div>
      <img
        src={rainbowSpinner}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
}
