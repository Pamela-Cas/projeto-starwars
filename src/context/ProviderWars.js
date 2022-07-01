import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextWars from './ContextWars';

function ProviderWars({ children }) {
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [busca, setBusca] = useState('');
  const [arrTypeFilter, setArrTypeFilter] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [xab, setXab] = useState([]);
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
    const arrXab = {
      arrTypeFilter,
      operator,
      value,
    };
    const auxXab = [arrXab, ...xab];
    setXab(auxXab);
    let newArr = [];
    auxXab.forEach((item) => {
      const results = data.filter((element) => {
        if (item.operator === 'igual a') {
          return parseInt(element[item.arrTypeFilter], 10) === parseInt(item.value, 10);
        }
        if (item.operator === 'maior que') {
          return parseInt(element[item.arrTypeFilter], 10) > parseInt(item.value, 10);
        }
        return parseInt(element[item.arrTypeFilter], 10) < parseInt(item.value, 10);
      });
      newArr = results;
    });
    setDataFiltered(results);
    setXab(newArr);
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
