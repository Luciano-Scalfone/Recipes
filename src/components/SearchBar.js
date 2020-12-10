import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { foodAPI } from '../services/foodAPI';
import { drinkAPI } from '../services/drinkAPI';
import ReceitasContext from '../context/ReceitasContext';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [url, setUrl] = useState('');

  const { setMeals, setDrinks } = useContext(ReceitasContext);

  const path = window.location.pathname;

  const handleUrl = (response, id) => {
    if (response.length === 1) setUrl(`${path}/${response[0][id]}`);
  };

  const handleFormSubmit = async () => {
    if (radioValue === 'first-letter' && searchValue.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (path.includes('comidas')) {
      const responseFoodsAPI = await foodAPI(radioValue, searchValue);
      if (!responseFoodsAPI) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setMeals(responseFoodsAPI);
        handleUrl(responseFoodsAPI, 'idMeal');
      }
    } else {
      const responseDrinksAPI = await drinkAPI(radioValue, searchValue);
      if (!responseDrinksAPI) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setDrinks(responseDrinksAPI);
        handleUrl(responseDrinksAPI, 'idDrink');
      }
    }
  };

  return (
    url.length ? <Redirect to={url} /> : (
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search Recipe"
          className="form-control"
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
        />
        <label htmlFor="ingredient" className="form-check-label">
          <input
            type="radio"
            id="ingredient"
            name="searchInputRadio"
            className="form-check-input"
            value={radioValue}
            onChange={({ target }) => setRadioValue(target.id)}
            data-testid="ingredient-search-radio"
          />
              Ingredient
            </label>
        <label htmlFor="name" className="form-check-label mx-2">
          <input
            type="radio"
            id="name"
            name="searchInputRadio"
            className="form-check-input"
            value={radioValue}
            onChange={({ target }) => setRadioValue(target.id)}
            data-testid="name-search-radio"
          />
              Name
            </label>
        <label htmlFor="first-letter" className="form-check-label mx-1">
          <input
            type="radio"
            id="first-letter"
            name="searchInputRadio"
            className="search-radio"
            value={radioValue}
            onChange={({ target }) => setRadioValue(target.id)}
            data-testid="first-letter-search-radio"
          />
              First Letter
            </label>
        <button
          type="submit"
          onClick={handleFormSubmit}
          data-testid="exec-search-btn"
          className="btn btn-light"
        >
          Search
            </button>
      </form>
    )
  );
}

export default SearchBar;
