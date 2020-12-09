import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Perfil = () => {
  const [storageEmail, setStorageEmail] = useState([]);
  const [isFetching, setFetching] = useState(true);

  const localStorageEmail = localStorage.getItem('user');

  useEffect(() => {
    if (localStorageEmail !== null) {
      const emailJSON = JSON.parse(localStorageEmail);
      const emailObject = Object.values(emailJSON);
      setStorageEmail(emailObject);
    }

    setFetching(false);
  }, [localStorageEmail]);

  const handleClick = () => {
    localStorage.clear();
  };

  return ((isFetching)
    ? <div>carregando...</div>
    : (
      <section>
        <Header title="Perfil" />
        <div>
          <span data-testid="profile-email">{storageEmail}</span>
        </div>
        <div>
          <Link to="/receitas-feitas">
            <button
              type="button"
              className="btn btn-lg btn-block"
              style={{ background: '#6CDC3E' }}
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              className="btn btn-lg btn-block"
              type="button"
              data-testid="profile-favorite-btn"
              style={{ background: '#6CDC3E' }}
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              onClick={handleClick}
              data-testid="profile-logout-btn"
              className="btn btn-lg btn-block my-4"
              style={{ background: '#6CDC3E' }}
            >
              Sair
            </button>
          </Link>
        </div>
        <Footer />
      </section >
    )
  );
};

export default Perfil;
