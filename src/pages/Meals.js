import React, { useContext, useEffect } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MealsCard from '../components/MealsCard';
import Footer from '../components/Footer';
import { foodAPI } from '../services/foodAPI';

const Comidas = (props) => {
  const { searchBox, meals, setMeals } = useContext(ReceitasContext);
  
  const { location } = props;
  const doze = 12;

  useEffect(() => {
    async function fetchFood() {
      if (!location.state) {
        const responseFoodsAPI = await foodAPI();

        setMeals(responseFoodsAPI);
      } else {
        const { type, endPoint } = location.state;
  
        const responseFoodsAPI = await foodAPI(type, endPoint);

        setMeals(responseFoodsAPI);
      }
    }

    fetchFood();
  }, []);

  return !meals.length ? (
    <div>
      carregando
    </div>
  ) : (
      <section>
        <Header title="Foods" searchBtn filters />
        {searchBox && <SearchBar />}
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
