import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import share from '../images/shareIcon.svg';
import ReceitasContext from '../context/ReceitasContext';
import { useLocation } from 'react-router-dom';
import { localVerifyMeal, localVerifyDrink } from '../services/RecipeDetailsServices';

const RecipeDetails = ({ recipe, index }) => {
  const { isFavorite, fetchById, setIsFavorite } = useContext(ReceitasContext);
  const { pathname } = useLocation();
  const [copied, setCopied] = useState(false);

  const recipePath = pathname.includes('comidas');

  const getIngredients = (obj, filter) => {
    const keys = [];

    Object.keys(obj).forEach((key) => {
      if (key && filter.test(key) && obj[key] !== '' && obj[key] !== null) {
        keys.push(obj[key]);
      }
    });
    return keys;
  };

  const copyToCB = () => {
    const url = window.location.href;

    copy(url);
    setCopied(true);
  };

  const localVerify = () => {
    recipePath ? localVerifyMeal(fetchById) : localVerifyDrink(fetchById);

    setIsFavorite(true);
  }

  const removeFavorite = (idRecipe) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    let index;

    favoriteRecipes.forEach((item, i) => {
      if (item.id === idRecipe) {
        index = i;
      }
    });

    const zero = 0;
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        ...favoriteRecipes.slice(zero, index),
        ...favoriteRecipes.slice(index + 1, favoriteRecipes.length),
      ]),
    );

    setIsFavorite(false);
  };

  const setFavorite = (idRecipe) => {
    const image = document.getElementById('favorite-img').src;

    if (image.includes(whiteHeartIcon)) {
      localVerify();
    } else {
      removeFavorite(idRecipe);
    }
  };

  return (
    <section key={index} className="details-card">
      <img
        className="recipe-image"
        data-testid="recipe-photo"
        src={
          recipePath
            ? recipe.strMealThumb
            : recipe.strDrinkThumb
        }
        width="100%"
        alt="recipes"
      />
      <div className="details">
        <div className="name-field">
          <div className="name-category">
            <h3 data-testid="recipe-title">
              {
                recipePath
                  ? recipe.strMeal
                  : recipe.strDrink
              }
            </h3>
            {!recipePath && <span data-testid="recipe-category">{recipe.strAlcoholic}</span>}
          </div>
          <div>
            <button
              data-testid="share-btn"
              type="button"
              onClick={copyToCB}
            >
              <img src={share} alt="share" />
            </button>
            {copied ? 'Link copiado!' : null}
            <button
              type="button"
              onClick={
                recipePath
                  ? () => setFavorite(recipe.idMeal)
                  : () => setFavorite(recipe.idDrink)
              }
            >
              <img
                data-testid="favorite-btn"
                id="favorite-img"
                src={!isFavorite ? whiteHeartIcon : blackHeartIcon}
                alt=""
              />
            </button>
          </div>
        </div>
        <h3 className="ingredients-title">Ingredients</h3>
        <div>
          {getIngredients(recipe, /strIngredient/).map((item, indx) => {
            const measure = getIngredients(recipe, /strMeasure/);
            return (
              <div className="ingredients-list">
                <span
                  key={indx}
                  data-testid={`${indx}-ingredient-name-and-measure`}
                >
                  {`${item} - ${measure[indx]}`}
                </span>
              </div>
            );
          })}
        </div>
        <h3 className="ingredients-title">Instructions</h3>
        <p data-testid="instructions">
          {recipe.strInstructions}
        </p>
      </div>
    </section>
  );
}

export default RecipeDetails;