import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { foodAPI, getAreas, getByArea } from '../services/foodAPI';
import RecipeCards from '../components/RecipeCards';
import ReceitasContext from '../context/ReceitasContext';
import Footer from '../components/Footer';

const ExplorarComidasArea = () => {
  const [areas, setAreas] = useState([]);
  const { meals, setMeals } = useContext(ReceitasContext);
  const doze = 12;

  useEffect(() => {
    const allOption = { strArea: 'All' };
    const minusOne = -1;
    let hasAll = false;
    foodAPI().then((response) => setMeals(response));
    getAreas()
      .then((response) => {
        response.forEach((obj) => {
          if (Object.values(obj).indexOf('All') > minusOne) {
            hasAll = true;
            return hasAll;
          }
        });
        if (!hasAll) {
          response.push(allOption);
        }

        return response;
      })
      .then((response) => setAreas(response));
  }, []);

  const handleSelect = () => {
    const dropdown = document.getElementById('area-dropdown');
    const selected = dropdown.options[dropdown.selectedIndex].value;
    if (selected === 'All') {
      foodAPI().then((response) => setMeals(response));
    } else {
      getByArea(selected).then((response) => setMeals(response));
    }
  };

  return (
    <div>
      <Header title="Explore By Area" />
      <div className="main-explore">
        <div className="explore-input">
          <label htmlFor="area-dropdown">
            Places:
            <select
              data-testid="explore-by-area-dropdown"
              id="area-dropdown"
              className="input-field"
              onChange={(target) => handleSelect(target)}
            >
              {areas.map((area, i) => (
                <option
                  data-testid={`${area.strArea}-option`}
                  key={i}
                  value={area.strArea}
                >
                  {area.strArea}
                </option>
              ))}
            </select>
          </label>
        </div>
        <main className="explore-cards">
          {meals.length && meals
            .filter((x, index) => index < doze)
            .map((food, i) => <RecipeCards key={i} recipe={food} index={i} />)}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorarComidasArea;
