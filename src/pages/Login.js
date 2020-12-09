import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/myfood.png';

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
    <section className="bg">
      <img src={logo} className="brand_logo" alt="Logo" />
      <form>
        <div>
          <span className="input-group-text">@</span>
          <input
            id="email-input"
            placeholder="email"
            type="text"
            className="form-control"
            name="email"
            data-testid="email-input"
            onChange={handleChange}
          />
        </div>
        <div>
          <span className="input-group-text">#</span>
          <input
            id="password-input"
            placeholder="password"
            className="form-control"
            name="password"
            type="password"
            data-testid="password-input"
            onChange={handleChange}
          />
        </div>
        <button
          disabled={disabled}
          type="button"
          className="btn login_btn"
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
