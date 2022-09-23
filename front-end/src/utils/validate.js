const validate = {
  login: (email, password) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const isEmailValid = emailRegex.test(email);
    const minPasswordLength = 6;
    const isPasswordValid = password.length >= minPasswordLength;

    return isEmailValid && isPasswordValid;
  },
};

export default validate;
