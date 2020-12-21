import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explore = () => (
  <div>
    <Header title="Explore" />
    <div className="explore">
      <div className="explore-buttons">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
        >
          Explore Foods
        </Link>
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
        >
          Explore Drinks
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

export default Explore;
