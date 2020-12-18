import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { listIngredients } from '../services/foodAPI';

const ExplorarComidasIng = () => {
  const {
    setMeals,
    ingredientList,
    setIngredientList,
  } = useContext(ReceitasContext);

  useEffect(() => {
    setMeals([{ key: 'teste' }]);

    listIngredients().then((response) => setIngredientList(response));
  }, []);

  const zero = 0;
  const twelve = 20;

  return (
    <section>
      <Header title="Explore By Ingredients" />
      <div className="main-content">
        {ingredientList
          && ingredientList.slice(zero, twelve).map((ingred, index) => (
            <div className="ingredient-cards">
              <Link
                to={{
                  pathname: '/comidas',
                  state: {
                    type: 'ingredient',
                    endPoint: `${ingred.strIngredient}`,
                  }
                }}
                data-testid={`${index}-ingredient-card`}
                key={ingred.strIngredient}
              >
                <div>
                  <img
                    data-testid={`${index}-card-img`}
                    src={`https://www.themealdb.com/images/ingredients/${ingred.strIngredient}-Small.png`}
                    alt={ingred.strIngredient}
                  />
                </div>
              </Link>
              <h5>
                {ingred.strIngredient}
              </h5>
            </div>
          ))}
      </div>
      <Footer />
    </section>
  );
};

export default ExplorarComidasIng;
