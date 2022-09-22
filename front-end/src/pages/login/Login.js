import React, { useEffect, useState } from 'react';
import caneca from '../../images/caneca.svg';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [button, setButton] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  const validateLogin = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const isEmailValid = emailRegex.test(login.email);
    const lengthPassword = 6;
    const isPasswordValid = login.password.length >= lengthPassword;

    if (isEmailValid && isPasswordValid) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    validateLogin();
  }, [login]);

  return (
    <div>
      <img src={ caneca } alt="caneca" />
      <div>
        <h1>Vamos tomar uma?</h1>
      </div>
      <div>
        <form>
          <input
            type="text"
            placeholder="Login"
            aria-label="Full name"
            name="email"
            value={ login.email }
            data-testid="common_login__input-email"
            onChange={ handleChange }
          />
          <input
            type="password"
            placeholder="Password"
            aria-label="Full name"
            name="password"
            value={ login.password }
            data-testid="common_login__input-password"
            onChange={ handleChange }
          />
          <button
            className="bg-transparent hover:bg-yellow-500
        text-white font-semibold
         hover:text-white py-2 px-4 border border-yellow-400
         hover:border-transparent rounded"
            type="button"
            name="button"
            data-testid="common_login__button-login"
            disabled={ button }
          >
            Login
          </button>
          <button
            className="bg-transparent hover:bg-yellow-500
        text-white font-semibold
         hover:text-white py-2 px-4 border border-yellow-400
         hover:border-transparent rounded"
            type="button"
            data-testid="common_login__button-register"
            name="register"
          >
            Ainda não tenho conta
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
