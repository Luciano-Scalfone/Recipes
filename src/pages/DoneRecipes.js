import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import share from '../images/shareIcon.svg';

const ReceitasFeitas = () => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleFilter = ({ target }) => {
    const { name } = target;

    setCurrentFilter(name);
  };

  const copyToCB = ({ target }) => {
    const { id, name } = target;
    const div = document.getElementById(id).parentElement.parentElement;
    const copied = document.createElement('span');

    copy(`http://localhost:3000/${name}s/${id}`);

    if (div.children.length === 1) {
      div.appendChild(copied).innerText = 'Link copiado!';
    }
  };

  return ((!recipes)
    ? <h1>No Recipes Yet!</h1>
    : (
      <section>
        <Header title="Receitas Feitas" />
        <div className="favorites-content">
          <div className="buttons">
            <button
              id="All"
              name="all"
              type="button"
              data-testid="filter-by-all-btn"
              onClick={handleFilter}
            >
              All
            </button>
            <button
              id="Food"
              name="comida"
              type="button"
              data-testid="filter-by-food-btn"
              onClick={handleFilter}
            >
              Food
            </button>
            <button
              id="Drink"
              name="bebida"
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={handleFilter}
            >
              Drink
            </button>
          </div>
          <div className="favorite-content">
            {recipes.filter((recipe) => (
              (currentFilter === 'all') ? recipe.type : recipe.type === currentFilter
            ))
              .map((recipe, index) => (
                <div key={index} className="cards">
                  <Link
                    to={`/${recipe.type === 'comida'
                      ? 'comidas' : 'bebidas'}/${recipe.id}`}
                  >
                    <img
                      data-testid={`${index}-horizontal-image`}
                      src={recipe.image}
                      alt=""
                    />
                  </Link>
                  <div className="done-data">
                    <div className="data">
                      <div className="name">
                        <h3>
                          {recipe.name}
                        </h3>
                        <span>
                          {recipe.area.length
                            ? (
                              `${recipe.area} - ${recipe.category}`
                            )
                            : (
                              recipe.alcoholicOrNot
                            )}
                        </span>
                      </div>
                      <span>
                        {recipe.doneDate}
                      </span>
                    </div>
                    <button type="button" className="btn" onClick={copyToCB}>
                      <img
                        id={recipe.id}
                        name={recipe.type}
                        data-testid={`${index}-horizontal-share-btn`}
                        src={share}
                        alt="share"
                      />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Footer />
      </section>
    )
  );
};

export default ReceitasFeitas;
