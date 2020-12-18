import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
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
        <Header title="Profile" />
        <div className="main-profile">
          <div className="content">
            <div className="user">
              <span data-testid="profile-email">{storageEmail}</span>
            </div>
            <div className="buttons">
              <div className="inner-field">
                <Link to="/receitas-feitas">
                  <button
                    type="button"
                    data-testid="profile-done-btn"
                  >
                    Done Recipes
                </button>
                </Link>
                <Link to="/receitas-favoritas">
                  <button
                    className="btn btn-lg btn-block"
                    type="button"
                  >
                    Favorite Recipes
                </button>
                </Link>
                <Link to="/">
                  <button
                    type="button"
                    onClick={handleClick}
                    data-testid="profile-logout-btn"
                  >
                    Log Out
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section >
    )
  );
};

export default Profile;
