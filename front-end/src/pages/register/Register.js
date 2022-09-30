import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { requestPost } from '../../services/requests';
import validate from '../../utils/validate';

export default function Register(props) {
  const { history } = props;
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [button, setButton] = useState(true);
  const [error, setError] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await requestPost('/register', register);
      history.push('/customer/products');
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  const validateRegister = () => {
    const { name, email, password } = register;
    const isRegisterValid = validate.register(name, email, password);

    if (isRegisterValid) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    validateRegister();
  }, [register]);

  return (
    <div className="cadastro">
      <h2>Cadastro</h2>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Seu nome"
          data-testid="common_register__input-name"
          name="name"
          value={ register.name }
          onChange={ handleChange }
        />
        <input
          type="email"
          placeholder="Seu nome"
          data-testid="common_register__input-email"
          name="email"
          value={ register.email }
          onChange={ handleChange }
        />
        <input
          type="password"
          placeholder="Seu nome"
          data-testid="common_register__input-password"
          name="password"
          value={ register.password }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ button }
        >
          Cadastrar
        </button>
      </form>
      {
        // Refatorar span com a biblioteca de "alert"
        error && (
          <span
            className="error"
            data-testid="common_register__element-invalid_register"
          >

            Usuário já existe

          </span>
        )
      }
    </div>
  );
}

Register.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,

  }).isRequired,
};
