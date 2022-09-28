// Pagina de Checkout
import React, { useEffect, useState } from 'react';
import CheckoutCard from '../../components/CheckoutCard';
import Header from '../../components/Header';
import { requestData, requestPost, setToken } from '../../services/requests';
import localStorage from '../../utils/localStorage';

const mockCart = [
  {
    productId: 1,
    name: 'xyz',
    price: '12.5',
    quantity: 1,
    subTotal: 10,
  },
  {
    productId: 2,
    name: 'jahdfjh',
    price: '1.5',
    quantity: 12,
    subTotal: 1020,
  },
];

export default function Checkout() {
  const { name: userName } = localStorage.get('user');
  const [sellers, setSellers] = useState(['Sheila']);
  const [sellerName, setSellerName] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [cart, setCart] = useState(mockCart);
  console.log(cart);
  // {
  //   productId: '',
  //   name: '',
  //   price: '',
  //   quantity: '',
  //   subTotal: '',
  // });

  const handleSubmit = async () => {
    // enviar objeto do cart para o body e realizar a requisição POST
    // para o back
    // const data = sellerName, deliveryAddress, deliveryNumber
    if (!cart) return null;
    const itens = cart.map((prod) => ({
      productId: prod.productId,
      quantity: prod.quantity,
    }));
    const body = {
      sellerName,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber,
      itens,
    };
    const response = await requestPost('/customer/orders', body);
    window.location.href = `/customer/orders/${response.id}`;
  };

  useEffect(() => {
    setCart(localStorage.get('cart'));
    const getSellers = async () => {
      const { token } = localStorage.get('user');
      setToken(token);
      const response = await requestData('/customer/checkout');
      setSellers(response);
    };
    getSellers();
  }, []);

  function renderOption(seller) {
    return (<option key={ seller } value={ seller }>{ seller }</option>);
  }

  return (
    <div className="white">
      <Header screenType="products" userName={ userName } userType="customer" />
      <hr />
      <h3>Finalizar Pedido</h3>
      {
        cart && (cart.map(({ name, quantity, price }, index) => (
          <CheckoutCard
            key={ index }
            index={ index }
            name={ name }
            quantity={ quantity }
            price={ price }
          />
        )))
      }
      <div>
        Total:
        <span data-testid="customer_checkout__element-order-total-price">000</span>
      </div>
      <h3>Detalhes e Endereço para entrega</h3>
      <hr />
      <p>Vendedora Responsável</p>
      <select
        id="seller"
        name="seller"
        value={ sellerName }
        data-testid="customer_checkout__select-seller"
        onChange={ (event) => setSellerName(event.target.value) }
      >
        { sellers && sellers.map((seller) => renderOption(seller)) }
      </select>
      <p>Endereço</p>
      <input
        type="text"
        data-testid="customer_checkout__input-address"
        id="address"
        value={ address }
        onChange={ (event) => setAddress(event.target.value) }
      />
      <p>Número</p>
      <input
        type="text"
        data-testid="customer_checkout__input-address-number"
        id="number"
        value={ number }
        onChange={ (event) => setNumber(event.target.value) }
      />
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
        onClick={ handleSubmit }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}