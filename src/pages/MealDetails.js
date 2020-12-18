import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFoodAPI } from '../services/foodAPI';
import RecipeDetails from '../components/RecipeDetails';

function DetalhesComida(props) {
  const {
    fetchById, setFetchById, beganRecipes, setBeganRecipes, doneRecipes, setIsFavorite,
  } = useContext(ReceitasContext);

  const {
    match: {
      params: { id },
    },
  } = props;

  const [isFetching, setFetching] = useState(true);

  const recipeID = id;
  const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    async function fetchDrink() {
      const responseID = await fetchFoodAPI(id);

      setFetchById(responseID);

      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );

      if (!favoriteRecipes || !favoriteRecipes.length) {
        setIsFavorite(false);
      } else if (favoriteRecipes.some((recipe) => recipe.id === id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }

      setFetching(false);
    }

    fetchDrink();
  }, []);

  const startRecipe = (recipeName) => {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...startedRecipes,
        meals: {
          [recipeName]: fetchById,
        },
      }),
    );

    if (!beganRecipes.includes(recipeName)) {
      setBeganRecipes([...beganRecipes, recipeName]);
    }
  };

  const verifyState = (idMeal) => {
    if (!startedRecipes.meals) {
      return 'Iniciar Receita';
    }
    if (!startedRecipes.meals[idMeal]) {
      return 'Iniciar Receita';
    }
    return 'Continuar Receita';
  };

  return isFetching ? (
    <div>
      carregando
    </div>
  ) : (
      <section>
        <Header title="Food Details" />
        <div className="main-detail">
          {fetchById.map((meal, index) => (
            <RecipeDetails recipe={meal} index={index} />
          ))}
          <div className="start-button">
            {!doneRecipes.includes(recipeID) && (
              <Link to={`/comidas/${recipeID}/in-progress`}>
                <button
                  data-testid="start-recipe-btn"
                  type="button"
                  onClick={() => startRecipe(recipeID)}
                >
                  {!startedRecipes
                    ? 'Iniciar Receita'
                    : verifyState(recipeID)}
                </button>
              </Link>
            )}
          </div>
        </div>
        <Footer />
      </section>
    );
}

DetalhesComida.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default DetalhesComida;
