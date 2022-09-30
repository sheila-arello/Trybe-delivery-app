import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { requestPost } from '../services/requests';
import validate from '../utils/validate';

function AdminRegister({ att }) {
  const [body, setBody] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState(false);
  const [button, setButton] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setBody({ ...body, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await requestPost('/admin/create', body);
      setBody({ name: '',
        email: '',
        password: '',
        role: 'customer' });
      setError(false);
      att();
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    const { name, email, password } = body;
    const isRegisterValid = validate.register(name, email, password);

    if (isRegisterValid) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [body]);

  return (
    <div>
      {error ? (
        <span
          className="error"
          data-testid="admin_manage__element-invalid-register"
        >
          Conflict - User already exists in the dataBase
        </span>
      ) : ''}
      <h2 className="span">Cadastrar novo usuário</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">
          Nome
          <br />
          <input
            type="text"
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            id="name"
            name="name"
            value={ body.name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <br />
          <input
            type="email"
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-email"
            id="email"
            name="email"
            value={ body.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <br />
          <input
            type="password"
            data-testid="admin_manage__input-password"
            id="password"
            name="password"
            value={ body.password }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="role">
          Tipo
          <br />
          <select
            name="role"
            data-testid="admin_manage__select-role"
            id="role"
            onChange={ handleChange }
          >
            <option default value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ button }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

AdminRegister.propTypes = {
  att: propTypes.shape({
    att: propTypes.func.isRequired,
  }).isRequired,
};

export default AdminRegister;
