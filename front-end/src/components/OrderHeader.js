import React from 'react';
import propTypes from 'prop-types';
import OrderStatus from './OrderStatus';

function OrderHeader({ userType, order, orderType }) {
  const { id, status, saleDate, sellerName } = order;
  const date = saleDate.split('T')[0];

  return (
    <section>
      <p data-testid={ `${userType}_orders__element-order-id-${id}` }>
        { `Pedido ${id}` }
      </p>
      <p data-testid={ `${userType}_orders__element-order-date-${id}` }>
        { date }
      </p>
      {
        userType === 'customer'
        && (
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { sellerName }
          </p>
        )
      }
      <OrderStatus
        status={ status }
        id={ id }
        userType={ userType }
        orderType={ orderType }
      />
      {
        userType === 'customer'
          ? (
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
            >
              MARCAR COMO ENTREGUE
            </button>
          )
          : (
            <div>
              <button
                type="button"
                data-testid="seller_order_details__button-preparing-check"
              >
                PREPARAR PEDIDO
              </button>
              <button
                type="button"
                data-testid="seller_order_details__button-dispatch-check"
              >
                SAIU PARA ENTREGA
              </button>
            </div>
          )
      }
    </section>
  );
}

OrderHeader.propTypes = {
  order: propTypes.shape({
    id: propTypes.number,
    status: propTypes.string,
    saleDate: propTypes.string,
    sellerName: propTypes.string,
  }).isRequired,
  userType: propTypes.string.isRequired,
  orderType: propTypes.string.isRequired,
};

export default OrderHeader;
