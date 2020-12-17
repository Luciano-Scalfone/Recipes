import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';
import RecipeCards from '../components/RecipeCards';
import { drinkAPI } from '../services/drinkAPI';

const Bebidas = (props) => {
  const { searchBox, drinks, setDrinks } = useContext(ReceitasContext);

  const { location } = props;
  const doze = 12;

  useEffect(() => {
    async function fetchDrink() {
      if (!location.state) {
        const responseDrinksAPI = await drinkAPI();

        setDrinks(responseDrinksAPI);
      } else {
        const { type, endPoint } = location.state;

        const responseDrinksAPI = await drinkAPI(type, endPoint);

        setDrinks(responseDrinksAPI);
      }
    }

    fetchDrink();
  }, []);

  return !drinks.length ? (
    <div>
      Loading
    </div>
  ) : (
      <section>
        <Header title="Drinks" searchBtn filters />
        {searchBox && <SearchBar />}
        <div className="main-content">
          {drinks.length && drinks
            .filter((_, index) => index < doze)
            .map((drink, i) => <RecipeCards key={i} recipe={drink} index={i} />)}
        </div>
        {location.pathname === '/bebidas' && <Footer />}
      </section>
    );
}

export default Bebidas;
