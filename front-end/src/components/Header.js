import React from 'react';
import propTypes from 'prop-types';

function Header({ userType, userName }) {
  return (
    <div>
      <nav>
        <section>
          {
            userType === 'products'
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
          { userName }
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
  userType: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
};

export default Header;
