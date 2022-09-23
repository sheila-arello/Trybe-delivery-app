import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import caneca from '../../images/caneca.svg';
import { requestLogin } from '../../services/requests';

function Login(props) {
  const { history } = props;
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [button, setButton] = useState(true);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    email: '',
    role: '',
    token: '',
  });

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

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { response } = await requestLogin('/login', login);

      setInfo({ ...response });
      setError(false);
      history.push('customer/products');
    } catch (err) {
      setInfo({
        name: '',
        email: '',
        role: '',
        token: '',
      });
      setError(true);
    }
  };

  // const handleSucess = () => {
  //   const MySwal = withReactContent(Swal);
  //   const success = MySwal.fire({
  //     title: <strong>login efetuado com sucesso!</strong>,
  //     html: <i>bem-vindo(a) ao bar do seu zé</i>,
  //     icon: 'success',
  //   });
  //   const fail = MySwal.fire({
  //     title: <strong>usuário não encontrado!</strong>,
  //     html: <i>tente novamente</i>,
  //     icon: 'success',
  //   });
  // };

  useEffect(() => {
    validateLogin();
  }, [login]);

  useEffect(() => info.token.length > 0
    && localStorage.setItem('info', JSON.stringify(info)), [info]);

  return (
    <div>
      <img src={ caneca } alt="caneca" />
      <div>
        <h1>Vamos tomar uma?</h1>
      </div>
      <div>
        <form onSubmit={ handleSubmit }>
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
            type="submit"
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
        {
          error && (
            <span
              className="error"
              data-testid="common_login__element-invalid-email"
            >

              Usuário inválido

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
