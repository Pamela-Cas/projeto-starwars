import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextWars from './ContextWars';

function ProviderWars({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getApiPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const dataPlanet = await response.json();
      const dataPlanetResults = dataPlanet.results;
      dataPlanetResults.filter((element) => delete element.residents);
      setData(dataPlanetResults);
      console.log(dataPlanetResults);
      return dataPlanetResults;
    };
    getApiPlanets();
  }, []);
  const apiPlanets = {
    data,
  };

  return (
    <ContextWars.Provider value={ apiPlanets }>
      {children}
    </ContextWars.Provider>
  );
}

ProviderWars.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderWars;
