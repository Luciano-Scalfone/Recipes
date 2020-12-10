import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <section
      data-testid="footer"
      className="footer"
    >
      <div className="footer-content">
        <Link to="/bebidas">
          <img alt="Bebidas" data-testid="drinks-bottom-btn" src={drinkIcon} />
        </Link>
        <Link to="/explorar">
          <img
            alt="Explorar"
            data-testid="explore-bottom-btn"
            src={exploreIcon}
          />
        </Link>
        <Link to="/comidas">
          <img alt="Comidas" data-testid="food-bottom-btn" src={mealIcon} />
        </Link>
      </div>
    </section>
  );
}

export default Footer;
