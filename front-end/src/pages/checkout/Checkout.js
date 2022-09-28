// Pagina de Checkout
import React, { useEffect, useState } from 'react';
import CheckoutCard from '../../components/CheckoutCard';
import Header from '../../components/Header';
import { requestData, requestPost, setToken } from '../../services/requests';
import localStorage from '../../utils/localStorage';

// const mockCart = [
//   {
//     productId: 1,
//     name: 'xyz',
//     price: '12.5',
//     quantity: 1,
//     subTotal: 10,
//   },
//   {
//     productId: 2,
//     name: 'jahdfjh',
//     price: '1.5',
//     quantity: 12,
//     subTotal: 1020,
//   },
// ];

export default function Checkout() {
  const [userName, setUserName] = useState('');
  const [sellers, setSellers] = useState(['Sheila']);
  const [sellerName, setSellerName] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [cart, setCart] = useState();
  const [total, setTotal] = useState();

  // console.log(cart);
  const totalPrice = () => cart.reduce((acc, curr) => acc + parseFloat(curr.subTotal), 0);

  const handleSubmit = async () => {
    // enviar objeto do cart para o body e realizar a requisição POST
    // para o back
    if (!cart) return null;

    const items = cart.map((prod) => ({
      productId: prod.productId,
      quantity: prod.quantity,
    }));
    const body = {
      sellerName,
      totalPrice: totalPrice(),
      deliveryAddress: address,
      deliveryNumber: number,
      items,
    };
    const response = await requestPost('/customer/orders', body);
    window.location.href = `/customer/orders/${response.id}`;
  };

  useEffect(() => {
    setCart(localStorage.get('carrinho'));
    const getSellers = async () => {
      const { token, name } = localStorage.get('user');
      setUserName(name);
      setToken(token);
      const response = await requestData('/customer/checkout');
      setSellers(response);
    };
    getSellers();
    setTotal(totalPrice());
  }, []);

  const renderOption = (seller) => (
    <option key={ seller } value={ seller }>{ seller }</option>
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
              />
            )))
          }
        </tbody>
      </table>

      <div>
        Total:
        <span data-testid="customer_checkout__element-order-total-price">
          { total }
        </span>
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
