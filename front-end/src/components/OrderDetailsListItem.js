import PropTypes from 'prop-types';
import React from 'react';

function OrderDetailsListItem({ index, name, price, quantity, editable }) {
  const page = editable ? 'order_details' : 'checkout';
  return (
    <tr>
      <td
        data-testid={ `customer_${page}__element-order-table-item-number-${index}` }
      >
        {index}
      </td>
      <td data-testid={ `customer_${page}__element-order-table-name-${index}` }>
        {name}
      </td>
      <td
        data-testid={ `customer_${page}__element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `customer_${page}__element-order-table-unit-price-${index}` }
      >
        {`R$ ${price.toFixed(2)}`}
      </td>
      <td
        data-testid={ `customer_${page}__element-order-table-sub-total-${index}` }
      >
        {`R$ ${(quantity * price).toFixed(2)}`}
      </td>
      {editable && (
        <td
          data-testid={ `customer_${page}__element-order-table-remove-${index}` }
        >
          {/* colocar botão de escluir aqui */}
        </td>
      )}
    </tr>
  );
}

OrderDetailsListItem.defaultProps = {
  editable: false,
};

OrderDetailsListItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  editable: PropTypes.bool,
};

export default OrderDetailsListItem;
