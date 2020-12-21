import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const FavoriteRecipes = () => {
  const [copied, setCopied] = useState(false);
  const [favRecipes, setFavRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavRecipes(favoriteRecipes);
  }, []);

  const copyToCB = (id) => {
    const url = `http://localhost:3000/comidas/${id}`;

    copy(url);
    setCopied(true);
  };

  const removeFavorite = (idRecipe) => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const zero = 0;
    let index;

    favoriteRecipes.forEach((item, i) => {
      if (item.id === idRecipe) {
        index = i;
      }
    });

    favoriteRecipes = [...favoriteRecipes.slice(zero, index),
    ...favoriteRecipes.slice(index + 1, favoriteRecipes.length)];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFavRecipes(favoriteRecipes);
    console.log(favoriteRecipes);
  };

  const handleFilter = (filt) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let filteredFav;
    if (filt !== 'all') {
      filteredFav = favoriteRecipes.filter((recipe) => recipe.type === filt);
    } else if (filt === 'all') {
      filteredFav = favoriteRecipes;
    }
    setFavRecipes(filteredFav);
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="favorites-content">
        <div className="buttons">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={() => handleFilter('all')}
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={() => handleFilter('comida')}
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={() => handleFilter('bebida')}
          >
            Drink
          </button>
        </div>
        <div className="favorite-content">
          {favRecipes && favRecipes
            .map((recipe, index) => {
              const { id } = recipe;
              if (recipe.type === 'comida') {
                return (
                  <div className="cards">
                    <Link to={`/comidas/${recipe.id}`}>
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        data-testid={`${index}-horizontal-image`}
                        width="100%"
                      />
                    </Link>
                    <div className="recipe-data">
                      <div className="recipe-name">
                        <h3>
                          {recipe.name}
                        </h3>
                        <span>
                          {recipe.area.length ? `${recipe.area} - ${recipe.category}` : recipe.category}
                        </span>
                      </div>
                      <div>
                        <button
                          data-testid={`${index}-horizontal-share-btn`}
                          type="button"
                          onClick={() => copyToCB(id)}
                          src={shareIcon}
                        >
                          <img
                            src={shareIcon}
                            alt="Compartilhar Receita"
                          />
                        </button>
                        {copied ? 'Link copiado!' : null}
                        <button
                          type="button"
                          onClick={() => removeFavorite(recipe.id)}
                          src={shareIcon}
                        >
                          <img
                            data-testid={`${index}-horizontal-favorite-btn`}
                            id="favorite-img"
                            src={blackHeartIcon}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              } else if (recipe.type === 'bebida') {
                return (
                  <div className="cards">
                    <Link to={`/bebidas/${recipe.id}`}>
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        data-testid={`${index}-horizontal-image`}
                        width="200"
                      />
                    </Link>
                    <div className="recipe-data">
                      <div className="recipe-name">
                        <h3>
                          {recipe.name}
                        </h3>
                        <span>
                          {recipe.alcoholicOrNot}
                        </span>
                      </div>
                      <div>
                        <button
                          data-testid={`${index}-horizontal-share-btn`}
                          type="button"
                          onClick={copyToCB}
                          src={shareIcon}
                        >
                          <img
                            src={shareIcon}
                            alt="Compartilhar Receita"
                          />
                        </button>
                        {copied ? 'Link copiado!' : null}
                        <button
                          type="button"
                          onClick={() => removeFavorite(recipe.id)}
                        >
                          <img
                            data-testid={`${index}-horizontal-favorite-btn`}
                            id="favorite-img"
                            src={blackHeartIcon}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              return '';
            })
          }
        </div>
      </div>
      <Footer />
    </div >
  )
};

export default FavoriteRecipes;
