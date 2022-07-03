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
  const [filters, setFilters] = useState([]);
  const [columnSort, setColumnSort] = useState(fieldTypesDefault[0]);
  const [columnSortType, setColumnSortType] = useState('ASC');

  const { handleSearch,
    handleRemoveAllFilters,
    handleRemoveOnlyFilter,
    handleOrder } = useContext(ContextWars);
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
    setFilters([...filters, filter]);
    handleSearch(filter);
  };

  const handleRemoveFilters = () => {
    setFieldTypes(fieldTypesDefault);
    handleRemoveAllFilters();
  };

  const handleRemoveSingleFilter = (filter) => {
    const newFilters = filters.filter((item) => item.fieldType !== filter.fieldType);
    setFieldTypes([...fieldTypes, filter.fieldType]);
    setFilters(newFilters);
    handleRemoveOnlyFilter(filter);
  };

  const handleSetColumnOrder = () => {
    handleOrder({ column: columnSort, sort: columnSortType });
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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemoveFilters }
        >
          Remover Filtros
        </button>
      </form>
      <form>
        <label htmlFor="column-filter">
          Coluna
          <select
            data-testid="column-sort"
            value={ columnSort }
            onChange={ ({ target }) => setColumnSort(target.value) }
          >
            {fieldTypesDefault.map((field, key) => <option key={ key }>{field}</option>)}
          </select>
        </label>
        <label htmlFor="column-sort">
          <input
            type="radio"
            name="column-sort"
            data-testid="column-sort-input-asc"
            value="ASC"
            onClick={ ({ target }) => setColumnSortType(target.value) }
            checked
          />
          ascendente
        </label>
        <label htmlFor="column-sort">
          <input
            type="radio"
            name="column-sort"
            data-testid="column-sort-input-desc"
            value="DESC"
            onClick={ ({ target }) => setColumnSortType(target.value) }
          />
          descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSetColumnOrder }
        >
          Ordenar
        </button>
      </form>

      <br />
      {filters && filters.map((filter, key) => (
        <div
          key={ key }
          data-testid="filter"
        >
          <span style={ { marginRight: 5 } }>{filter.fieldType}</span>
          <span style={ { marginRight: 5 } }>{filter.operator}</span>
          <span style={ { marginRight: 5 } }>{filter.value}</span>
          <button
            type="button"
            onClick={ () => handleRemoveSingleFilter(filter) }
          >
            Remover

          </button>
        </div>
      )) }
    </div>
  );
}
