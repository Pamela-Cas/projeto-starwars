import React from 'react';
import ContextWars from './ContextWars';

function ProviderWars() {
  return (
    <ContextWars.Provider>
      {children}
    </ContextWars.Provider>
  );
}

export default ProviderWars;
