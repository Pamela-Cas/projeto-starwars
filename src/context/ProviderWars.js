import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextWars from './ContextWars';

function ProviderWars({ children }) {
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [busca, setBusca] = useState('');
  const [filters, setFilters] = useState([]);

  const orderList = (list, order, isNumber) => list.sort((a, b) => {
    const one = 1;
    const oneLess = -1;

    let aFieldValue = a[order.column];
    let bFieldValue = b[order.column];
    if (isNumber) {
      aFieldValue = parseInt(a[order.column], 10);
      bFieldValue = parseInt(b[order.column], 10);
      if (Number.isNaN(aFieldValue)) { return one; }
    }

    if (order.sort === 'ASC') {
      return aFieldValue > bFieldValue
        ? one
        : oneLess;
    }
    return aFieldValue < bFieldValue
      ? one
      : oneLess;
  });

  useEffect(() => {
    const getApiPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataPlanet = await response.json();
      const dataPlanetResults = dataPlanet.results;
      dataPlanetResults.filter((element) => delete element.residents);
      console.table(dataPlanetResults);
      const orderedList = orderList(dataPlanetResults,
        { column: 'name', sort: 'ASC' });
      setData(orderedList);
      setDataFiltered(orderedList);
    };
    getApiPlanets();
  }, []);

  useEffect(() => {
    let newArr = data;
    filters.forEach((item) => {
      const results = newArr.filter((element) => {
        if (item.operator === 'igual a') {
          return parseInt(element[item.fieldType], 10) === parseInt(item.value, 10);
        }
        if (item.operator === 'maior que') {
          return parseInt(element[item.fieldType], 10) > parseInt(item.value, 10);
        }
        return parseInt(element[item.fieldType], 10) < parseInt(item.value, 10);
      });
      newArr = results;
    });
    setDataFiltered(newArr);
  }, [filters, data]);

  const handleSearch = (filter) => {
    setFilters([...filters, filter]);
  };

  const handleRemoveAllFilters = () => {
    setFilters([]);
  };

  const handleRemoveOnlyFilter = (filter) => {
    const newFilters = filters.filter((item) => item.fieldType !== filter.fieldType);
    setFilters(newFilters);
  };

  const handleOrder = (order) => {
    const dataOrdered = orderList(dataFiltered, order, true);
    setDataFiltered([...dataOrdered]);
  };

  const dataPlanet = {
    dataFiltered,
    busca,
    setBusca,
    handleSearch,
    handleRemoveAllFilters,
    handleRemoveOnlyFilter,
    handleOrder,

    filterByName: {
      name: busca,
    },

  };
  useEffect(() => {});
  return (
    <ContextWars.Provider value={ dataPlanet }>
      {children}
    </ContextWars.Provider>
  );
}

ProviderWars.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderWars;
