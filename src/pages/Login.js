import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: 0,
  });

  const inputValues = () => {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const regexp = /^[a-zA-Z0-9.!#$%&_-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i;
    const six = 6;

    if (regexp.test(email) && password.length > six) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUser({
      ...user,
      [name]: value,
    });

    inputValues();
  };

  const setUserOnLocalStorage = () => {
    const { email } = user;

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const handleClick = () => {
    setUserOnLocalStorage();
    history.push('/comidas');
  };

  return (
    <section>
      <form>
        <div>
          <input
            id="email-input"
            placeholder="email"
            type="text"
            name="email"
            data-testid="email-input"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            id="password-input"
            placeholder="password"
            name="password"
            type="password"
            data-testid="password-input"
            onChange={handleChange}
          />
        </div>
        <button
          disabled={disabled}
          type="button"
          data-testid="login-submit-btn"
          onClick={handleClick}
        >
          Login
            </button>
      </form>
    </section >
  );
};

export default Login;
