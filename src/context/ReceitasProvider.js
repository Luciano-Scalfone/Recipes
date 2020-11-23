import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReceitasContext from './ReceitasContext';

const ReceitasProvider = ({ children }) => {
  const [searchBox, setSearchBox] = useState(false);
  const [data, setData] = useState([]);
  const [filtersData, setFiltersData] = useState([]);

  const state = {
    searchBox,
    setSearchBox,
    data,
    setData,
    filtersData,
    setFiltersData,
  };

  return (
    <ReceitasContext.Provider value={ state }>
      {children}
    </ReceitasContext.Provider>
  );
};

ReceitasProvider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export default ReceitasProvider;