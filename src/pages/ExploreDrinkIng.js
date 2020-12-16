import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { listIngredients, drinkAPI } from '../services/drinkAPI';

const ExplorarBebidasIng = () => {
  const {
    setDrinks,
    drinksIngredientList,
    setDrinksIngredientList,
    setStopApi,
  } = useContext(ReceitasContext);

  useEffect(() => {
    setDrinks([{ key: 'teste' }]);

    listIngredients().then((response) => setDrinksIngredientList(response));
  }, []);

  const zero = 0;
  const twelve = 12;

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="main-content">
        {drinksIngredientList
          && drinksIngredientList.slice(zero, twelve).map((ingred, index) => (
            <Link
              to={{
                pathname: '/bebidas',
                state: {
                  type: 'ingredient',
                  endPoint: `${ingred.strIngredient1}`,
                }
              }}
              data-testid={`${index}-ingredient-card`}
              key={ingred.strIngredient1}
            >
              <div className="card shadow">
                <img
                  data-testid={`${index}-card-img`}
                  src={`https://www.thecocktaildb.com/images/ingredients/${ingred.strIngredient1}-Small.png`}
                  alt={ingred.strIngredient1}
                />
                <h5
                  data-testid={`${index}-card-name`}
                >
                  {ingred.strIngredient1}
                </h5>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default ExplorarBebidasIng;
