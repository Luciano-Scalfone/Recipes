import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Filters from './Filters';

const Header = ({ title, searchBtn = false, filters = false }) => {
  const { searchBox, setSearchBox } = useContext(ReceitasContext);

  const showSearchBar = () => setSearchBox(!searchBox);

  return (
    <section className="header">
      <div className="header-content">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={profileIcon}
            alt="Profile button"
          />
        </Link>
        <h3 data-testid="page-title">
          {title}
        </h3>
        {searchBtn ? (
        <button
          type="button"
          className="image"
          onClick={showSearchBar}
        >
          <img
            data-testid="search-top-btn"
            src={searchIcon}
            alt="show-hide-sbr"
          />
        </button>
      ) : (
        <div />
      )}
      </div>
      {filters && <Filters />}
    </section>
  );
};

Header.propTypes = {
  title: propTypes.string.isRequired,
  searchBtn: propTypes.bool.isRequired,
};

export default Header;
