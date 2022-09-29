import React from 'react';
import propTypes from 'prop-types';

function Header({ screenType, userName, userType }) {
  const handleToLeave = async () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleToCustomerOrders = async () => {
    window.location.href = '/customer/orders';
  };

  const handleToProducts = async () => {
    window.location.href = '/customer/products';
  };

  return (
    <div>
      <nav>
        <section>
          {
            screenType === 'products'
              ? (
                <button
                  type="submit"
                  data-testid="customer_products__element-navbar-link-products"
                  onClick={ handleToProducts }
                >
                  PRODUTOS
                </button>
              )
              : (
                <span data-testid="customer_products__element-navbar-link-orders">
                  {userType === 'administrator' ? 'GERENCIAR USUÁRIO' : 'PEDIDOS'}
                </span>
              )
          }
        </section>
        {
          userType === 'customer'
          && (
            <button
              type="submit"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ handleToCustomerOrders }
            >
              MEUS PEDIDOS
            </button>
          )
        }
        <span data-testid="customer_products__element-navbar-user-full-name">
          { userName }
        </span>
        <button
          type="submit"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleToLeave }
        >
          Sair
        </button>
      </nav>
    </div>
  );
}

Header.propTypes = {
  screenType: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
  userType: propTypes.string.isRequired,
};

export default Header;
