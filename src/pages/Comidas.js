import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MealsCard from '../components/MealsCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';
import FoodFilters from '../components/FoodFilters';
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
        <Header title="Comidas" searchBtn />
        {searchBox && <SearchBar history={history} />}
        <FoodFilters />
        <div className="row my-4 mx-3">
          {meals.length && meals
            .filter((x, index) => index < doze)
            .map((food, i) => <MealsCard key={i} food={food} index={i} />)}
        </div>
        {location.pathname === '/comidas' && <Footer />}
      </section>
    );
};

export default Comidas;
