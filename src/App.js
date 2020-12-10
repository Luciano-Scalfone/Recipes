import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Bebidas from './pages/Drinks';
import BebidasInProgress from './pages/DrinksInProgress';
import DetalhesBebida from './pages/DrinkDetails';
import ExplorarBebidas from './pages/ExploreDrinks';
import ExplorarBebidasIng from './pages/ExploreDrinkIng';

import Explorar from './pages/Explore';

import Comidas from './pages/Meals';
import ComidasInProgress from './pages/MealsInProgress';
import DetalhesComida from './pages/MealDetails';
import ExplorarComidas from './pages/ExploreMeals';
import ExplorarComidasArea from './pages/ExploreArea';
import ExplorarComidasIng from './pages/ExploreMealIng';

import FavoriteRecipes from './pages/FavoriteRecipes';
import ReceitasFeitas from './pages/DoneRecipes';

import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

import './Sass/App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/comidas/:id" component={ DetalhesComida } />
        <Route exact path="/comidas/:id/in-progress" component={ ComidasInProgress } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/bebidas/:id" component={ DetalhesBebida } />
        <Route exact path="/bebidas/:id/in-progress" component={ BebidasInProgress } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIng }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIng }
        />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/perfil" component={ Perfil } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
