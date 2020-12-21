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
      <Header title="Explore Foods" />
      <div className="explore">
        <div className="explore-buttons">
          <Link to="/explorar/comidas/ingredientes">
            By Ingredients
          </Link>
          <Link to="/explorar/comidas/area">
            By Area
          </Link>
          <Link
            to={`/comidas/${randomMealID}`}
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

export default ExplorarComidas;
