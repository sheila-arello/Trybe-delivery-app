import React from 'react';
import propTypes from 'prop-types';

function CheckoutCard({
  index,
  productId,
  name,
  quantity,
  price,
}) {
  const prefix = 'customer_checkout__element-order-table';

  return (
    <div>
      <div>
        <input
          data-testid={ `${prefix}-item-number-${productId}` }
          id="name"
          value={ index + 1 }
          disabled
        />
      </div>
      <div>
        <span
          data-testid={ `${prefix}-name-${productId}` }
        >
          { name }
        </span>
      </div>
      <div>
        <span
          data-testid={ `${prefix}-quantity-${productId}` }
        >
          { quantity }
        </span>
      </div>
      <div>
        <span
          data-testid={ `${prefix}-unit-price-${productId}` }
        >
          { price }
        </span>
      </div>
      <div>
        <span
          data-testid={ `${prefix}-sub-total-${productId}` }
        >
          { price * quantity }
        </span>
      </div>
      <div>
        <button
          type="button"
          data-testid={ `${prefix}-remove-${productId}` }
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
  productId: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  quantity: propTypes.number.isRequired,
};

export default CheckoutCard;
