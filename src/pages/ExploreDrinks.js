import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { fetchRandomDrink } from '../services/drinkAPI';

const ExplorarBebidas = () => {
  const { randomDrinkID, setRandomDrink, setFetchById } = useContext(ReceitasContext);

  useEffect(() => {
    fetchRandomDrink().then((response) => {
      setRandomDrink(response.idDrink);
    });
  }, []);

  return (
    <div className="bg">
      <Header title="Explorar Bebidas" />
      <div className="main-content">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
            </button>
        </Link>
        <Link
          to={`/bebidas/${randomDrinkID}`}
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

export default ExplorarBebidas;
