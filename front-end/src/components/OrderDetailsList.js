import PropTypes from 'prop-types';
import React from 'react';
import OrderDetailsListItem from './OrderDetailsListItem';

function OrderDetailsList({ editable, orderItems }) {
  return (
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
