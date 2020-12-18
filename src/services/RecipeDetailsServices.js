export const localVerifyDrink = (fetchById) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const {
    idDrink,
    strCategory,
    strAlcoholic,
    strDrink,
    strDrinkThumb,
  } = fetchById[0];

  if (!favoriteRecipes) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        },
      ]),
    );
  } else {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        ...favoriteRecipes,
        {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        },
      ]),
    );
  }
};

export const localVerifyMeal = (fetchById) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const {
    idMeal,
    strArea,
    strCategory,
    strMeal,
    strMealThumb,
  } = fetchById[0];

  if (!favoriteRecipes) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ]),
    );
  } else {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        ...favoriteRecipes,
        {
          id: idMeal,
          type: 'comida',
          area: '',
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ]),
    );
  }
};