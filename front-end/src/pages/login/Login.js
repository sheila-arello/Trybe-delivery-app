import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import caneca from '../../images/caneca.svg';
import { requestPost } from '../../services/requests';
import validate from '../../utils/validate';

function Login(props) {
  const { history } = props;
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [button, setButton] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    token: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  const validateLogin = () => {
    const { email, password } = login;

    const isLoginValid = validate.login(email, password);

    if (isLoginValid) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { response } = await requestPost('/login', login);

      setUser({ ...response });
      setError(false);
      if (response.role === 'seller') history.push(`${response.role}/orders`);
      if (response.role === 'customer') history.push('customer/products');
      if (response.role === 'administrator') history.push('admin/manage');
    } catch (err) {
      setUser({
        name: '',
        email: '',
        role: '',
        token: '',
      });
      setError(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      window.location.href = '/customer/products';
    }
  }, []);

  useEffect(() => {
    validateLogin();
  }, [login]);

  useEffect(() => user.token.length > 0
    && localStorage.setItem('user', JSON.stringify(user)), [user]);

  return (
    <div className="flex justify-center flex-col items-center  gap-2">
      <img src={ caneca } alt="caneca" />
      <div>
        <h1 className="text-white text-xl font-mono mb-2">Vamos tomar uma?</h1>
      </div>
      <div>
        <form
          onSubmit={ handleSubmit }
          className="flex justify-center flex-col items-center gap-6"
        >
          <label htmlFor="email" className="text-white">
            Email
            <input
              type="text"
              placeholder="Login"
              aria-label="Full name"
              name="email"
              value={ login.email }
              data-testid="common_login__input-email"
              onChange={ handleChange }
              className="w-full max-w-xs bg-transparent border-b-2"
            />
          </label>
          <label htmlFor="password" className="text-white">
            Senha
            <input
              type="password"
              placeholder="Password"
              aria-label="Full name"
              name="password"
              value={ login.password }
              data-testid="common_login__input-password"
              onChange={ handleChange }
              className="input-borderedput
                w-full max-w-xs bg-transparent border-b-2 "
            />
          </label>
          <button
            className="hover:bg-yellow-500
              text-white font-semibold
              hover:text-white py-2 px-4 border border-yellow-400
              hover:border-transparent rounded w-full font-mono bg-yellow-500"
            type="submit"
            name="button"
            data-testid="common_login__button-login"
            disabled={ button }
          >
            Entrar
          </button>

          <button
            className="bg-transparent hover:bg-yellow-500
            text-white font-semibold
             hover:text-white py-2 px-4 border border-yellow-400
             hover:border-transparent rounded w-full font-mono"
            type="button"
            data-testid="common_login__button-register"
            name="register"
            onClick={ () => history.push('/register') }
          >
            Ainda n??o tenho conta
          </button>
        </form>

        {
          // Refatorar span com a biblioteca de "alert"
          error && (
            <span
              className="error"
              data-testid="common_login__element-invalid-email"
            >

              Usu??rio inv??lido

            </span>
          )
        }

      </div>
    </div>
  );
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,

  }).isRequired,
};

export default Login;
