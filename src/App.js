import React from 'react';
import './App.css';
import ProviderWars from './context/ProviderWars';
import TablePlanet from './components/TablePlanet';
import SearchPlanets from './components/SearchPlanets';
import Filters from './components/Filters';

function App() {
  return (
    <ProviderWars>
      <SearchPlanets />
      <Filters />
      <TablePlanet />
    </ProviderWars>
  );
}

export default App;
