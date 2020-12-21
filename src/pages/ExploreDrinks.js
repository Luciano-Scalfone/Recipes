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
      <Header title="Explore Drinks" />
      <div className="explore">
        <div className="explore-buttons">
          <Link to="/explorar/bebidas/ingredientes">
            By Ingredients
        </Link>
          <Link
            to={`/bebidas/${randomDrinkID}`}
            onClick={() => setFetchById(false)}
          >
            Surprise-me!
        </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorarBebidas;
