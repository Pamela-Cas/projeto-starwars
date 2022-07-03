import React, { useContext, useEffect, useState } from 'react';
import ContextWars from '../context/ContextWars';

export default function Filters() {
  const fieldTypesDefault = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const [fieldTypes, setFieldTypes] = useState(fieldTypesDefault);
  const [fieldType, setFieldType] = useState(fieldTypesDefault[0]);
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);

  const { handleSearch } = useContext(ContextWars);
  useEffect(() => {
    setFieldType(fieldTypes[0]);
  }, [fieldTypes]);

  const handleSetFilterSearch = () => {
    const filter = {
      fieldType,
      operator,
      value,
    };
    const newFieldTypes = fieldTypes.filter((field) => field !== filter.fieldType);
    setFieldTypes(newFieldTypes);
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
            {fieldTypes.map((field, key) => <option key={ key }>{field}</option>)}
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
