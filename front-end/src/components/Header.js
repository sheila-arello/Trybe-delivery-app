import React from 'react';
import propTypes from 'prop-types';

export default function Header({ screenType, userName, userType }) {
  return (
    <div className="white">
      <nav>
        <section>
          {
            screenType === 'products'
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
        {
          userType === 'customer'
          && (
            <span data-testid="customer_products__element-navbar-link-orders">
              MEUS PEDIDOS
            </span>
          )
        }
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
  screenType: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
  userType: propTypes.string.isRequired,
};
