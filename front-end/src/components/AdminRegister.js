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
    <div className="p-4">
      {error ? (
        <span
          className="error"
          data-testid="admin_manage__element-invalid-register"
        >
          Conflict - User already exists in the dataBase
        </span>
      ) : ''}
      <h3 className="text-white my-5 font-bold">Cadastrar novo usuário</h3>
      <form onSubmit={ handleSubmit }>
        <label
          htmlFor="name"
          className="text-d-orange my-3"
        >
          Nome
          <input
            type="text"
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            id="name"
            name="name"
            value={ body.name }
            onChange={ handleChange }
            className="input input-bordered w-full ml-5 max-w-xs"
          />
        </label>
        <br />
        <label
          htmlFor="email"
          className="text-d-orange my-3"
        >
          Email
          <input
            type="email"
            placeholder="email"
            data-testid="admin_manage__input-email"
            id="email"
            name="email"
            value={ body.email }
            onChange={ handleChange }
            className="input input-bordered w-full ml-5 max-w-xs"
          />
        </label>
        <br />
        <label
          htmlFor="password"
          className="text-d-orange my-3"
        >
          Senha
          <input
            type="password"
            data-testid="admin_manage__input-password"
            id="password"
            name="password"
            value={ body.password }
            onChange={ handleChange }
            className="input input-bordered w-full ml-5 max-w-xs"
          />
        </label>
        <br />
        <label
          htmlFor="role"
          className="text-d-orange my-3"
        >
          Tipo
          <select
            name="role"
            data-testid="admin_manage__select-role"
            id="role"
            onChange={ handleChange }
            className="select select-bordered w-full ml-6 max-w-xs"
          >
            <option default value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <br />
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ button }
          className="
            border-2
            border-d-orange
            rounded
            px-3
            py-2
            my-10
            text-d-orange
            transition-all
            hover:border-black
            hover:bg-d-orange
            hover:text-black
            "
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
