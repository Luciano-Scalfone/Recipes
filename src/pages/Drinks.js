import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';
import DrinksCard from '../components/DrinksCard';
import { drinkAPI } from '../services/drinkAPI';

function Bebidas() {
  const {
    searchBox, drinks, setDrinks,
  } = useContext(ReceitasContext);

  const location = useLocation();
  const doze = 12;

  useEffect(() => {
    async function fetchDrink() {
      const responseDrinksAPI = await drinkAPI();

      setDrinks(responseDrinksAPI);
    }

    if (!drinks.length) fetchDrink();
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
          {drinks
            .filter((x, index) => index < doze)
            .map((drink, i) => (
              <DrinksCard key={i} drink={drink} index={i} />
            ))}
        </div>
        {location.pathname === '/bebidas' && <Footer />}
      </section>
    );
}

export default Bebidas;
