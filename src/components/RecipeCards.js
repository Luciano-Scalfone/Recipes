import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCards({ recipe, index }) {
  const { pathname } = useLocation();

  const recipePath = pathname.includes('comidas');

  return (
    <section className="recipe-cards">
      <Link
        className="cards"
        to={
          recipePath
            ? `/comidas/${recipe.idMeal}`
            : `/bebidas/${recipe.idDrink}`
        }
      >
        <img
          data-testid={`${index}-card-img`}
          src={
            recipePath
              ? recipe.strMealThumb
              : recipe.strDrinkThumb
          }
          alt={
            recipePath
              ? recipe.strMeal
              : recipe.strDrink
          }
        />
        
      </Link>
      <h5 data-testid={`${index}-card-name`}>
        {
          recipePath
            ? recipe.strMeal
            : recipe.strDrink
        }
      </h5>
    </section>
  );
}

RecipeCards.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCards;
