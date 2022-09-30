// Pagina de Checkout
import React, { useEffect, useState } from 'react';
import CheckoutCard from '../../components/CheckoutCard';
import Header from '../../components/Header';
import { requestData, requestPost, setToken } from '../../services/requests';
import { convert } from '../../utils/convert';

export default function Checkout() {
  const [userName, setUserName] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // console.log(cart);
  const totalPrice = () => cart
    .reduce((acc, curr) => acc + parseFloat(curr.subTotal), 0);

  const handleSubmit = async () => {
    // enviar objeto do cart para o body e realizar a requisição POST
    // para o back
    if (!cart) return null;
    const items = cart.map((prod) => ({
      productId: prod.productId,
      quantity: prod.quantity,
    }));
    const body = {
      sellerId,
      totalPrice: total,
      deliveryAddress: address,
      deliveryNumber: number,
      items,
    };
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const response = await requestPost('/customer/orders', body);
    window.location.href = `/customer/orders/${response.id}`;
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('carrinho')));
    const getSellers = async () => {
      const { token, name } = JSON.parse(localStorage.getItem('user'));
      setUserName(name);
      setToken(token);
      const response = await requestData('/customer/checkout');
      console.log(response);
      setSellerId(response[0].id);
      setSellers(response);
    };
    getSellers();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setTotal(totalPrice());
    } else {
      setTotal(0);
    }
  }, [cart]);

  const handleRemove = (id) => {
    const carrinho = cart.filter((el) => el.productId !== id);

    setCart(carrinho);
  };

  const renderOption = ({ id, name }) => (
    <option key={ id } value={ id }>{ name }</option>
  );

  return (
    <div className="white">
      <Header screenType="products" userName={ userName } userType="customer" />
      <hr />
      <h3>Finalizar Pedido</h3>
      <table>
        <caption>Items</caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {
            cart && (cart.map(({ productId, name, quantity, price }, index) => (

              <CheckoutCard
                key={ index }
                index={ index }
                productId={ productId }
                name={ name }
                quantity={ quantity }
                price={ price }
                handleRemove={ handleRemove }
              />
            )))
          }
        </tbody>
      </table>

      <div>
        Total:
        <span data-testid="customer_checkout__element-order-total-price">
          { convert(total) }
        </span>
      </div>
      <h3>Detalhes e Endereço para entrega</h3>
      <hr />
      <p>Vendedora Responsável</p>
      <select
        id="seller"
        name="seller"
        value={ sellerId }
        data-testid="customer_checkout__select-seller"
        onChange={ (event) => setSellerId(event.target.value) }
      >
        { sellers.length && sellers.map((seller) => renderOption(seller)) }
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
