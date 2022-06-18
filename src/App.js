import React from 'react';
import './App.css';
import ProviderWars from './context/ProviderWars';
import TablePlanet from './components/TablePlanet';
import SearchPlanets from './components/SearchPlanets';

function App() {
  return (
    <ProviderWars>
      <SearchPlanets />
      <TablePlanet />
    </ProviderWars>
  );
}

export default App;
