import React, { useState } from 'react';
import propTypes from 'prop-types';
import convert from '../utils/convert';

export default function ProductCard({ id, name, price, image, add, sub, handleQty }) {
  const convertedPrice = convert(price);

  const [quantity, setQuantity] = useState(0);

  const addItem = (obj) => {
    add(obj);
    return quantity >= 0 && setQuantity(quantity + 1);
  };

  const subItem = (obj) => {
    sub(obj);
    return quantity >= 1 && setQuantity(quantity - 1);
  };

  const handleValue = ({ target: { value } }) => {
    setQuantity(Number(value));
    handleQty({ id, name, price }, Number(value));
  };

  return (
    <div className="white">
      <span data-testid={ `customer_products__element-card-price-${id}` }>
        {convertedPrice}
      </span>
      <div>
        <div>
          <img
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            src={ image }
            alt={ name }
            width="200"
            height="200"
          />
        </div>
        <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      </div>
      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ () => subItem({ id, name, price }) }
          disabled={ quantity === 0 }

        >
          -

        </button>
        <input
          type="number"
          placeholder="0"
          value={ quantity }
          data-testid={ `customer_products__input-card-quantity-${id}` }
          onChange={ (ev) => handleValue(ev) }
        />

        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => addItem({ id, name, price }) }
        >
          +

        </button>

      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  add: propTypes.func.isRequired,
  sub: propTypes.func.isRequired,
  handleQty: propTypes.func.isRequired,
};
