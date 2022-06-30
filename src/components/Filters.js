import React, { useContext } from 'react';
import ContextWars from '../context/ContextWars';

export default function Filters() {
  const {
    setValue,
    value,
    setArrTypeFilter,
    arrTypeFilter,
    operator,
    setOperator, handleSearch } = useContext(ContextWars);

  return (
    <div>
      <form>
        <label htmlFor="column-filter">
          Coluna
          <select
            data-testid="column-filter"
            value={ arrTypeFilter }
            onChange={ ({ target }) => setArrTypeFilter(target.value) }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operator
          <select
            data-testid="comparison-filter"
            value={ operator }
            onChange={ ({ target }) => setOperator(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          placeholder="0"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleSearch }
        >
          Filter
        </button>
      </form>
    </div>
  );
}
