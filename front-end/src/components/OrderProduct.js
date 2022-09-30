import React from 'react';
import propTypes from 'prop-types';
import { convert } from '../utils/convert';

function OrderProduct(
  { userType, item, id, name, quantity, price, totalPrice, orderType },
) {
  const index = id - 1;

  return (
    <>
      <td /* data-testid= 41(customer) e 58(seller) */
        data-testid={
          `${userType}_${orderType}__element-order-table-item-number-${index}`
        }
      >
        { item }
      </td>
      <td /* data-testid= 42(customer) e 59(seller) */
        data-testid={ `${userType}_${orderType}__element-order-table-name-${index}` }
      >
        { name }
      </td>
      <td /* data-testid= 43(customer) e 60(seller) */
        data-testid={ `${userType}_${orderType}__element-order-table-quantity-${index}` }
      >
        { quantity }
      </td>
      <td /* data-testid= 44(customer) e 61(seller) */
        data-testid={
          `${userType}_${orderType}__element-order-table-unit-price-${index}`
        }
      >
        { convert(price) }
      </td>
      <td /* data-testid= 45(customer) e 62(seller) */
        data-testid={ `${userType}_${orderType}__element-order-table-sub-total-${index}` }
      >
        { totalPrice(quantity * price) }
        { convert(quantity * price) }
      </td>
    </>
  );
}

// 25.654

OrderProduct.propTypes = {
  userType: propTypes.string.isRequired,
  item: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
  totalPrice: propTypes.func.isRequired,
  orderType: propTypes.string.isRequired,
};

export default OrderProduct;
