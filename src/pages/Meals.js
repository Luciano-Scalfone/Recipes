import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MealsCard from '../components/MealsCard';
import Footer from '../components/Footer';
import { foodAPI } from '../services/foodAPI';

const Comidas = (history) => {
  const { searchBox, meals, setMeals } = useContext(ReceitasContext);

  const location = useLocation();
  const doze = 12;

  useEffect(() => {
    async function fetchFood() {
      const responseFoodsAPI = await foodAPI();

      setMeals(responseFoodsAPI);
    }

    if (!meals.length) fetchFood();
  }, []);

  return !meals.length ? (
    <div>
      carregando
    </div>
  ) : (
      <section>
        <Header title="Foods" searchBtn filters />
        {searchBox && <SearchBar history={history} />}
        <div className="main-content">
          {meals.length && meals
            .filter((_, index) => index < doze)
            .map((food, i) => <MealsCard key={i} food={food} index={i} />)}
        </div>
        {location.pathname === '/comidas' && <Footer />}
      </section>
    );
};

export default Comidas;
