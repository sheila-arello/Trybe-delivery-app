import React, { useEffect, useState } from 'react';
import validate from '../../utils/validate';

export default function Register() {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [button, setButton] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setRegister({ ...register, [name]: value });
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
      <form>
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
    </div>
  );
}

// common_register__input-name
// - 7: common_register__input-email
// - 8: common_register__input-password
// - 9: common_register__button-register
// - 10: common_register__element-invalid_register [Elemento oculto (Mensagens de erro)]
