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

      setInfo({ ...response });
      setError(false);
      if (response.role === 'seller') history.push(`${response.role}/orders`);
      if (response.role === 'customer') history.push('customer/products');
      if (response.role === 'administrator') history.push('admin/manage');
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
            onClick={ () => history.push('/register') }
          >
            Ainda não tenho conta
          </button>
        </form>

        {
          // Refatorar span com a biblioteca de "alert"
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
