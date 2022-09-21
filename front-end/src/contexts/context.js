import React, { useState, createContext } from 'react';
import propTypes from 'prop-types';

const context = createContext();

export default function Provider(props) {
  const [state, setState] = useState();
  const { children } = props;

  const states = {
    state,
    setState,
  };

  return (
    <context.Provider value={ states }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};
