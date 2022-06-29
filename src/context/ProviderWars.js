import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextWars from './ContextWars';

function ProviderWars({ children }) {
  const [data, setData] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const getApiPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataPlanet = await response.json();
      const dataPlanetResults = dataPlanet.results;
      dataPlanetResults.filter((element) => delete element.residents);
      // console.log(dataPlanetResults);
      setData(dataPlanetResults);
    };
    getApiPlanets();
  }, []);

  const dataPlanet = {
    data,
    busca,
    setBusca,

    filterByName: {
      name: busca,
    },

  };

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
