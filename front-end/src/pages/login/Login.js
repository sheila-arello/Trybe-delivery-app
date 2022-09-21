import React from 'react';
import caneca from '../../images/caneca.svg';

function Login() {
  return (
    <div>
      <img src={ caneca } alt="caneca" />
      <div className="flex items-center justify-center">
        <h1 className="text-white font-bold mt-10">Vamos tomar uma?</h1>
      </div>
      <div className="flex flex-col gap-10 mt-10 p-6">
        <div className="flex flex-col items-center border-b border-white py-2 gap-10">
          <input
            className="
        appearance-none
        bg-transparent
        border-none
        text-gray-700
        mr-3 py-1
        px-2
        leading-tight
        focus:outline-none"
            type="text"
            placeholder="Login"
            aria-label="Full name"
            id="common_login__input-email"
          />
        </div>
        <div
          className="
        flex flex-col items-center
        border-b border-white
        py-2 gap-10"
        >
          <input
            className="
        appearance-none
        bg-transparent
        border-none
        text-gray-700
        mr-3 py-1
        px-2
        leading-tight
        focus:outline-none"
            type="text"
            placeholder="Password"
            aria-label="Full name"
            id="common_login__input-password"
          />
        </div>
        <button
          className="bg-transparent hover:bg-yellow-500
        text-white font-semibold
         hover:text-white py-2 px-4 border border-yellow-400
         hover:border-transparent rounded"
          type="button"
          id="common_login__button-login"
        >
          Login
        </button>
        <button
          className="bg-transparent hover:bg-yellow-500
        text-white font-semibold
         hover:text-white py-2 px-4 border border-yellow-400
         hover:border-transparent rounded"
          type="button"
          id="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </div>
    </div>
  );
}

export default Login;

// : common_login__input-email
// - 2: common_login__input-password
// - 3: common_login__button-login
