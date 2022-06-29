import React from 'react';

export default function Filters() {
  return (
    <div>
      <form>
        <label htmlFor="column-filter">
          Coluna
          <select data-testid="column-filter">
            <option>population</option>
            <option>Orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operator
          <select data-testid="comparison-filter">
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="comparison-filter"
          placeholder="0"
        />
        <button
          type="button"
          data-testid="button-filter"
        >
          Filter
        </button>
      </form>
    </div>
  );
}
