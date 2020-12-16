import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explore = () => (
  <div>
    <Header title="Explore" />
    <div className="main-content">
      <Link
        to="/explorar/comidas"
        data-testid="explore-food"
      >
        <span>Explorar Comidas</span>
      </Link>
      <Link
        to="/explorar/bebidas"
        data-testid="explore-drinks"
      >
        <span>Explorar Bebidas</span>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Explore;
