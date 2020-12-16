import React, { useContext, useEffect } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import { foodByCategoryApi, foodAPI, foodCategoryApi } from '../services/foodAPI';
import { drinkByCategoryApi, drinkAPI, drinkCategoryApi } from '../services/drinkAPI';
import { useLocation } from 'react-router-dom';

function Filters() {
  const {
    filtersData, selectedFilter, setMeals, setDrinks, setSelectedFilter, setFiltersData,
  } = useContext(ReceitasContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("/comidas")) {
      async function fetchMeal() {
        const data = await foodCategoryApi();

        setFiltersData(data);
      }

      fetchMeal();
    } else {
      async function fetchMeal() {
        const data = await drinkCategoryApi();

        setFiltersData(data);
      }

      fetchMeal();
    }
  }, []);

  async function fetchFood() {
    const responseFoodApi = await foodAPI();
    setMeals(responseFoodApi);
  }

  async function fetchDrink() {
    const responseDrinksAPI = await drinkAPI();
    setDrinks(responseDrinksAPI);
  }

  const filters = (category) => {
    if (pathname.includes("/comidas")) {
      if (category === 'All') {
        fetchFood();
      } else {
        foodByCategoryApi(category).then((response) => {
          setMeals(response.meals);
        });
      }
    } else {
      if (category === 'All') {
        fetchDrink();
      } else {
        drinkByCategoryApi(category).then((response) => {
          setDrinks(response.drinks);
        });
      }
    }
  };

  const activeFilters = (target) => {
    const active = document.getElementsByClassName('active-filter');

    if(active.length > 0) {
      if(active[0].innerHTML === target.innerHTML) {
        target.classList.remove('active-filter');
      } else {
        active[0].classList.remove('active-filter');
        target.classList.add('active-filter');
      }
    } else {
      target.classList.add('active-filter');
    }
  };

  const filterByCategory = ({ target }) => {
    const { innerHTML } = target;

    activeFilters(target);

    if (pathname.includes("/comidas")) {
      if (innerHTML !== selectedFilter) {
        filters(innerHTML);
        setSelectedFilter(innerHTML);
      } else {
        fetchFood();
        setSelectedFilter('All');
      }
    } else {
      if (innerHTML !== selectedFilter) {
        filters(innerHTML);
        setSelectedFilter(innerHTML);
      } else {
        fetchDrink();
        setSelectedFilter('All');
      }
    }
  };

  return (
    <div className="filters">
      {filtersData.map((filter) => (
        <button
          key={filter}
          className="filter-button"
          type="button"
          data-testid={`${filter}-category-filter`}
          onClick={ filterByCategory }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default Filters;
