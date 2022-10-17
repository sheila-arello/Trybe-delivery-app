import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import OrderStatus from './OrderStatus';
import { convertDate } from '../utils/convert';
import { setToken, requestPut } from '../services/requests';

const magic = 3;

function OrderHeader({ userType, order, orderType }) {
  const { id, status, saleDate, sellers: { name } } = order;
  const [orderStatus, setOrderStatus] = useState(status);
  const [buttonState, setbuttonState] = useState();
  const allStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];
  const sellerName = name;
  const date = convertDate(saleDate);

  useEffect(() => {
    const index = allStatus.indexOf(status);
    setbuttonState(index + 1);
  }, []);

  useEffect(() => {
    console.log(orderStatus);
  }, [orderStatus]);

  async function putStatus(saleStatus) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    await requestPut(`${userType}/orders/${id}`, { saleStatus });
  }
  function updateStatus(buttonClicked) {
    // Valor do botão acionado corresponde ao indice do array allStatus
    // Esta função verifica qual estado deve ser setado em orderStatus
    // e qual o proximo botão a ser habilitado (estado atual + 1)
    const statusAtual = allStatus[buttonClicked];
    setOrderStatus(statusAtual);
    setbuttonState(buttonClicked + 1);
    putStatus(statusAtual);
  }

  function renderButton(textButton, dataTesteid, position) {
    console.log(buttonState);
    return (
      <button
        className="btn btn-warning"
        type="button"
        data-testid={ dataTesteid }
        disabled={ buttonState !== position }
        onClick={ () => updateStatus(buttonState) }
      >
        { textButton }
      </button>
    );
  }

  function renderStatus() {
    if (userType === 'customer') {
      const dataTesteid = 'customer_order_details__button-delivery-check';
      return renderButton('MARCAR COMO ENTREGUE', dataTesteid, magic);
    }
    const buttons = [
      ['PREPARAR PEDIDO', 'seller_order_details__button-preparing-check', 1],
      ['SAIU PARA ENTREGA', 'seller_order_details__button-dispatch-check', 2],
    ];
    return buttons.map((button) => renderButton(button[0], button[1], button[2]));
  }

  return (
    <section
      className="mt-4 mb-4 bg-white flex justify-between items-center gap-2 p-2 flex-wrap"
    >
      <p
        data-testid={ `${userType}_${orderType}__element-order-details-label-order-id` }
        className="font-bold"
      >
        {`Pedido ${id}`}
      </p>
      <p /* data-testid= 39(customer) e 55(seller) */
        data-testid={ `${userType}_${orderType}__element-order-details-label-order-date` }
        className="font-bold"
      >
        {date}
      </p>
      {userType === 'customer' && (
        <p /* data-testid= 38(customer) */
          className="font-bold"
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {sellerName}
        </p>
      )}
      <OrderStatus
        status={ orderStatus }
        id={ id }
        userType={ userType }
        orderType={ orderType }
      />
      { renderStatus() }
    </section>
  );
}

OrderHeader.propTypes = {
  order: propTypes.shape({
    id: propTypes.number,
    status: propTypes.string,
    saleDate: propTypes.string,
    sellers: propTypes.shape({
      name: propTypes.string,
    }).isRequired,
  }).isRequired,
  userType: propTypes.string.isRequired,
  orderType: propTypes.string.isRequired,
};
export default OrderHeader;
