import React from 'react';
import propTypes from 'prop-types';

function CheckoutCard({
  index,
  name,
  quantity,
  price,
}) {
  const prefix = 'customer_checkout__element-order-table';

  return (
    <div>
      <div>
        <span
          data-testid={ `${prefix}-item-number-${index}` }
        >
          { index + 1 }
        </span>
      </div>
      <div>
        <span
          data-testid={ `${prefix}-name-${index}` }
        >
          { name }
        </span>
      </div>
      <div>
        <span
          data-testid={ `${prefix}-quantity-${index}` }
        >
          { quantity }
        </span>
      </div>
      <div>
        <span
          data-testid={ `${prefix}-unit-price-${index}` }
        >
          { price }
        </span>
      </div>
      <div>
        <span
          data-testid={ `${prefix}-sub-total-${index}` }
        >
          { price * quantity }
        </span>
      </div>
      <div>
        <button
          type="button"
          data-testid={ `${prefix}-remove-${index}` }
          // onClick={ () => handleRemove() }
        >
          Remover
        </button>
      </div>
    </div>
  );
}

CheckoutCard.propTypes = {
  index: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  quantity: propTypes.number.isRequired,
};

export default CheckoutCard;
