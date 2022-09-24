import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

function Header({ history: { location: { pathname } } }) {
  const [user, setUser] = useState({
    name: '',
  });

  useEffect(() => {
    const { name } = JSON.parse(localStorage.getItem('info'));
    if (name) { setUser(name); }
  }, []);

  return (
    <div>
      <nav>
        <section>
          {
            pathname.includes('products')
            // pathname === '/customer/products'
              ? (
                <span data-testid="customer_products__element-navbar-link-products">
                  PRODUTOS
                </span>
              )
              : (
                <span data-testid="customer_products__element-navbar-link-orders">
                  PEDIDOS
                </span>
              )
          }
        </section>
        <span data-testid="customer_products__element-navbar-user-full-name">
          { user.name }
        </span>
        <ul>
          <li data-testid="customer_products__element-navbar-link-logout">
            Sair
          </li>
        </ul>
      </nav>
    </div>
  );
}

Header.propTypes = {
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Header;
