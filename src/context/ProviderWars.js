import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextWars from './ContextWars';

function ProviderWars({ children }) {
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [busca, setBusca] = useState('');
  const [arrTypeFilter, setArrTypeFilter] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);

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

  const handleSearch = () => {
    setDataFiltered(data);
    const results = data.filter((element) => {
      if (operator === 'igual a') {
        return parseInt(element[arrTypeFilter], 10) === parseInt(value, 10);
      }
      if (operator === 'maior que') {
        return parseInt(element[arrTypeFilter], 10) > parseInt(value, 10);
      }
      return parseInt(element[arrTypeFilter], 10) < parseInt(value, 10);
    });
    console.log(results);
    setDataFiltered(results);
  };

  const dataPlanet = {
    dataFiltered,
    busca,
    setBusca,
    setValue,
    value,
    setArrTypeFilter,
    arrTypeFilter,
    operator,
    setOperator,
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
