// Pagina de Checkout
import React, { useEffect, useState } from 'react';
import CheckoutCard from '../../components/CheckoutCard';
import Header from '../../components/Header';
import { requestData, requestPost, setToken } from '../../services/requests';
import localStorage from '../../utils/localStorage';

export default function Checkout() {
  const [sellers, setSellers] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [cart, setCart] = useState({
    productId: '',
    name: '',
    price: '',
    quantity: '',
    subTotal: '',
  });

  const handleSubmit = async () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const finalizarPedido = async () => {
    // Precisa realizar novamente o setToken ?
    const { token } = localStorage.get('user');
    setToken(token);
    // enviar objeto do cart para o body e realizar a requisição POST
    // para o back
    // const data = sellerName, deliveryAddress, deliveryNumber
    const body = {
      productId: '',
      name: '',
      price: '',
      quantity: '',
      subTotal: '',
    };
    const response = await requestPost('/customer/orders', body);
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

  return (
    <div className="white">
      <Header screenType="products" userName={ userName } userType="customer" />
      <hr />
      <h3>Finalizar Pedido</h3>
      {
        cart.map(({ name, quantity, price }, index) => (
          <CheckoutCard
            key={ index }
            index={ index }
            name={ name }
            quantity={ quantity }
            price={ price }
          />
        ))
      }
      <div>
        Total:
        <span data-testid="customer_checkout__element-order-total-price">000</span>
      </div>
      <h3>Detalhes e Endereço para entrega</h3>
      <hr />
      <p>Vendedora Responsável</p>
      <select data-testid="customer_checkout__select-seller">
        <option>Ana</option>
        <option>Pedro</option>
      </select>
      <select
        id="seller"
        name="seller"
        value={ seller }
        data-testid="customer_checkout__select-seller"
        onChange={ (event) => setColOrder(event.target.value) }
      >
        { sellers.map((seller) => renderOption(seller)) }
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
