import React from 'react';
import propTypes from 'prop-types';
import { convert } from '../utils/convert';

function CheckoutCard({
  index,
  productId,
  name,
  quantity,
  price,
  handleRemove,
}) {
  const prefix = 'customer_checkout__element-order-table';
  const convertedPrice = convert(price);
  return (
    <tr>

      <td
        data-testid={ `${prefix}-item-number-${index}` }
        id="index"
      >
        { index + 1 }
      </td>

      <td
        data-testid={ `${prefix}-name-${index}` }
        id="name"
      >
        { name }

      </td>

      <td
        data-testid={ `${prefix}-quantity-${index}` }
        id="quantity"
      >
        { quantity }
      </td>

      <td
        data-testid={ `${prefix}-unit-price-${index}` }
        id="price"
      >
        { convertedPrice }
      </td>

      <td
        data-testid={ `${prefix}-sub-total-${index}` }
        id="subtotal"
      >
        { convert(price * quantity) }
      </td>

      <td>
        <button
          type="button"
          data-testid={ `${prefix}-remove-${index}` }
          onClick={ () => handleRemove(productId) }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

CheckoutCard.propTypes = {
  index: propTypes.number.isRequired,
  productId: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
  handleRemove: propTypes.func.isRequired,
};

export default CheckoutCard;
