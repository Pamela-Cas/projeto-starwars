import React, { useContext } from 'react';
import ContextWars from '../context/ContextWars';

function SearchPlanets() {
  const { busca, setBusca } = useContext(ContextWars);
  console.log(busca);

  return (
    <div>
      <span>
        Projeto Star Wars Planets
      </span>
      <input
        data-testid="name-filter"
        type="text"
        name="name"
        value={ busca }
        placeholder="Search Planets"
        onChange={ (ev) => setBusca(ev.target.value) }
      />
    </div>
  );
}
export default SearchPlanets;
