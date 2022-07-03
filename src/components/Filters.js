import React, { useContext, useState } from 'react';
import ContextWars from '../context/ContextWars';

export default function Filters() {
  const [fieldType, setFieldType] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);

  const { handleSearch } = useContext(ContextWars);

  const handleSetFilterSearch = () => {
    const filter = {
      fieldType,
      operator,
      value,
    };
    handleSearch(filter);
  };

  return (
    <div>
      <form>
        <label htmlFor="column-filter">
          Coluna
          <select
            data-testid="column-filter"
            value={ fieldType }
            onChange={ ({ target }) => setFieldType(target.value) }
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
          onClick={ handleSetFilterSearch }
        >
          Filter
        </button>
      </form>
    </div>
  );
}
