import PropTypes from 'prop-types';
import React from 'react';
import OrderDetailsListItem from './OrderDetailsListItem';

function OrderDetailsList({ editable, orderItems }) {
  return (
    <div>
      <table style={ { border: '1px solid black' } }>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {editable && <th>Remover item</th>}
          </tr>
        </thead>
        <tbody>
          {/* Fazer um map nos itens do pedido */}
          {orderItems?.map((item, index) => (
            <OrderDetailsListItem
              key={ item.id }
              index={ index }
              { ...item }
              editable={ editable }
            />
          ))}
        </tbody>
      </table>
      <span data-testid="customer_checkout__element-order-total-price">
        {`R$ ${orderItems
          ?.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
          .toFixed(2)}`}
      </span>
    </div>
  );
}

OrderDetailsList.defaultProps = {
  editable: false,
};

OrderDetailsList.propTypes = {
  editable: PropTypes.bool,
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default OrderDetailsList;
