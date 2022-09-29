import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../context';

function OrderDetailsListItem({ index, name, price, quantity, id, editable }) {
  const { cart, setCart, userData } = useContext(AppContext);

  const page = editable ? 'checkout' : 'order_details';

  const handleRemoveItem = () => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  return (
    <tr>
      <td
        data-testid={
          `${userData.role}_${page}__element-order-table-item-number-${index}`
        }
      >
        {index + 1}
      </td>
      <td data-testid={ `${userData.role}_${page}__element-order-table-name-${index}` }>
        {name}
      </td>
      <td
        data-testid={ `${userData.role}_${page}__element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td
        data-testid={
          `${userData.role}_${page}__element-order-table-unit-price-${index}`
        }
      >
        {`R$ ${price.toFixed(2).replace('.', ',')}`}
      </td>
      <td
        data-testid={ `${userData.role}_${page}__element-order-table-sub-total-${index}` }
      >
        {`R$ ${(quantity * price).toFixed(2).replace('.', ',')}`}
      </td>
      {editable && (
        <td
          data-testid={ `${userData.role}_${page}__element-order-table-remove-${index}` }
        >
          <Button
            type="button"
            onClick={ handleRemoveItem }
            data-testid={
              `${userData.role}_${page}__element-order-table-remove-${index}`
            }
          >
            Remover
          </Button>
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
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  editable: PropTypes.bool,
};

export default OrderDetailsListItem;
