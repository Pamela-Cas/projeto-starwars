import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextWars from './ContextWars';

function ProviderWars({ children }) {
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [busca, setBusca] = useState('');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const getApiPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataPlanet = await response.json();
      const dataPlanetResults = dataPlanet.results;
      dataPlanetResults.filter((element) => delete element.residents);
      setData(dataPlanetResults);
      setDataFiltered(dataPlanetResults);
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

  const dataPlanet = {
    dataFiltered,
    busca,
    setBusca,
    handleSearch,

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
