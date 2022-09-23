import React from 'react';
import propTypes from 'prop-types';

function Header({ history: { location: { pathname } } }) {
  return (
    <div>
      <header>
        <section>
          {
            pathname.includes('products')
            // pathname === '/customer/products'
              ? (
                <nav data-testid="customer_products__element-navbar-link-products">
                  produtos
                </nav>
              )
              : (
                <nav data-testid="customer_products__element-navbar-link-orders">
                  pedidos
                </nav>
              )
          }
        </section>
        <nav data-testid="customer_products__element-navbar-user-full-name">
          nome da pessoa
        </nav>
        <ul>
          <li data-testid="customer_products__element-navbar-link-logout">
            sair
          </li>
        </ul>
      </header>
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

export default Routes;
