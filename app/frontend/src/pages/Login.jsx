import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const MIN_LENGTH_LOGIN = 6;
    const emailCheck = email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+([a-z]+)?$/i);
    const passwordCheck = password.length > MIN_LENGTH_LOGIN;
    if (emailCheck && passwordCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const history = useHistory();

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="Email"
        />
        <br />
        <input
          data-testid="password-input"
          type="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="Password"
        />
        <br />
        <button
          className="LoginBtn"
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ () => handleClick() }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
