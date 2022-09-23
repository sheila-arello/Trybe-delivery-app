import React from 'react';

export default function Register() {
  return (
    <div className="cadastro">
      <h2>Cadastro</h2>
      <form>
        <input
          type="text"
          placeholder="Seu nome"
          data-testid="common_register__input-name"
        />
        <input
          type="email"
          placeholder="Seu nome"
          data-testid="common_register__input-email"
        />
        <input
          type="password"
          placeholder="Seu nome"
          data-testid="common_register__input-password"
        />
        <button
          type="submit"
          data-testid="common_register__button-register"
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
