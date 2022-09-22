import React from 'react';
import caneca from '../../images/caneca.svg';

function Login() {
  return (
    <div>
      <img src={ caneca } alt="caneca" />
      <div>
        <h1>Vamos tomar uma?</h1>
      </div>
      <div>
        <div>
          <input
            type="text"
            placeholder="Login"
            aria-label="Full name"
            data-testid="common_login__input-email"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Password"
            aria-label="Full name"
            data-testid="common_login__input-password"
          />
        </div>
        <button
          className="bg-transparent hover:bg-yellow-500
        text-white font-semibold
         hover:text-white py-2 px-4 border border-yellow-400
         hover:border-transparent rounded"
          type="button"
          data-testid="common_login__button-login"
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
        >
          Ainda não tenho conta
        </button>
      </div>
    </div>
  );
}

export default Login;
