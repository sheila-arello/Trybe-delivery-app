// Pagina de Checkout
import React, { useEffect, useState } from 'react';
import CheckoutCard from '../../components/CheckoutCard';
import Header from '../../components/Header';
import { requestData, setToken } from '../../services/requests';
import localStorage from '../../utils/localStorage';

export default function Checkout() {
  const [sellers, setSellers] = useState();
  const [productList, setProducts] = useState([{
    name: "Coca Cola",
    price: 23.40,
    quantity: 2,
  }]);
  
  useEffect(() => {
    const getSellers = async () => {
      const { token } = localStorage.get('user');
      setToken(token);
      // get da lista de produtos no localStorage

      const response = await requestData('/customer/checkout');
      setSellers(response);
    };
    getSellers();
  }, []);

  return (
    <div className='white'>
      <Header screenType="products" userType="customer" />
      <hr />
      <h3>Finalizar Pedido</h3>
      {
        productList.map((product, index) => (
          <CheckoutCard
            key={ index }
            index={ index }
            product={ product }
          />
        ))
      }
      <div>
        Total:
        <span data-testid='customer_checkout__element-order-total-price'>000</span>
      </div>
      <h3>Detalhes e Endereço para entrega</h3>
      <hr />
      <p>Vendedora Responsável</p>
      <select data-testid='customer_checkout__select-seller'>
        <option>Ana</option>
        <option>Pedro</option>
      </select>
      <p>Endereço</p>
        <input type='text' data-testid='customer_checkout__input-address'
        />
      <p>Número</p>
      <input type='text' data-testid='customer_checkout__input-address-number'
        />
      <button type='submit' data-testid='customer_checkout__button-submit-order'>
        Finalizar Pedido
      </button>
    </div>
  );
}

