import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { fetchRandomMeal } from '../services/foodAPI';

const ExplorarComidas = () => {
  const { randomMealID, setRandomMeal, setFetchById } = useContext(ReceitasContext);

  useEffect(() => {
    fetchRandomMeal().then((response) => {
      setRandomMeal(response.idMeal);
    });
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" />
      <div className="main-content">
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
            </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
        </button>
        </Link>
        <Link
          to={`/comidas/${randomMealID}`}
          onClick={() => setFetchById(false)}
        >
          <button
            data-testid="explore-surprise"
            type="button"
          >
            Me Surpreenda!
        </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorarComidas;
