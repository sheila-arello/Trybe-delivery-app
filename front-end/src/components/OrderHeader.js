import React from 'react';
import propTypes from 'prop-types';
import OrderStatus from './OrderStatus';
import { convertDate } from '../utils/convert';

function OrderHeader({ userType, order, orderType }) {
  const { id, status, saleDate, sellers: { name } } = order;
  const sellerName = name;
  const date = convertDate(saleDate);
  // const [isDisabledCustomer, setIsDisabledCustomer] = userState(true);

  // useEffect(() => {
  //   console.log(status);
  //   if (status === 'preparando') setIsDisabledCustomer(false);
  // }, [status]);

  // Possível erro de teste: tags p das linhas precisarem ser mudadas para label
  // por conta do data-testid
  return (
    <section>
      <p /* data-testid= 37(customer) e 53(seller) */
        data-testid={ `${userType}_${orderType}__element-order-details-label-order-id` }
      >
        { `Pedido ${id}` }
      </p>
      <p /* data-testid= 39(customer) e 55(seller) */
        data-testid={ `${userType}_${orderType}__element-order-details-label-order-date` }
      >
        { date }
      </p>
      {
        userType === 'customer'
        && (
          <p /* data-testid= 38(customer) */
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
              /* data-testid= 47(customer) */
              data-testid="customer_order_details__button-delivery-check"
              disabled
            >
              MARCAR COMO ENTREGUE
            </button>
          )
          : (
            <div>
              <button
                type="button"
                /* data-testid= 56(seller) */
                data-testid="seller_order_details__button-preparing-check"
              >
                PREPARAR PEDIDO
              </button>
              <button
                type="button"
                /* data-testid= 57(seller) */
                data-testid="seller_order_details__button-dispatch-check"
                disabled
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
    sellers: propTypes.shape({
      name: propTypes.string,
    }).isRequired,
  }).isRequired,
  userType: propTypes.string.isRequired,
  orderType: propTypes.string.isRequired,
};

export default OrderHeader;
