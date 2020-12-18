import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinkAPI } from '../services/drinkAPI';
import RecipeDetails from '../components/RecipeDetails';

function DetalhesBebida(props) {
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
    async function fetchFood() {
      const responseAPI = await fetchDrinkAPI(id);

      setFetchById(responseAPI);

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

    fetchFood();
  }, []);

  const startRecipe = (recipeName) => {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...startedRecipes,
        cocktails: {
          [recipeName]: fetchById,
        },
      }),
    );

    if (!beganRecipes.includes(recipeName)) {
      setBeganRecipes([...beganRecipes, recipeName]);
    }
  };

  const verifyState = (idDrink) => {
    if (!startedRecipes.cocktails) {
      return 'Iniciar Receita';
    }
    if (!startedRecipes.cocktails[idDrink]) {
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
        <Header title="Drink Details" />
        <div className="main-detail">
          {fetchById.map((drink, index) => (
            <RecipeDetails recipe={drink} index={index} />
          ))}
          <div className="start-button">
            {!doneRecipes.includes(recipeID) && (
              <Link to={`/bebidas/${recipeID}/in-progress`}>
                <button
                  id="button"
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
      </section >
    );
}

DetalhesBebida.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default DetalhesBebida;
