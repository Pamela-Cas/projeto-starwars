import React from 'react';
import './App.css';
import ProviderWars from './context/ProviderWars';

function App() {
  return (
    <ProviderWars>
      <span>Hello, App!</span>
    </ProviderWars>
  );
}

export default App;
