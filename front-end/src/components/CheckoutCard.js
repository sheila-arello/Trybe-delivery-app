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
          id="index"
          value={ index + 1 }
          disabled
        />
      </div>
      <div>
        <input
          data-testid={ `${prefix}-name-${productId}` }
          id="name"
          value={ name }
          disabled
        />
      </div>
      <div>
        <input
          data-testid={ `${prefix}-quantity-${productId}` }
          id="quantity"
          value={ quantity }
          disabled
        />
      </div>
      <div>
        <input
          data-testid={ `${prefix}-unit-price-${productId}` }
          id="price"
          value={ price }
          disabled
        />
      </div>
      <div>
        <input
          data-testid={ `${prefix}-sub-total-${productId}` }
          id="quantity"
          value={ price * quantity }
          disabled
        />
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
