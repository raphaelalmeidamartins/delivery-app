import Delete from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../context';

function OrderDetailsListItem({ index, name, price, quantity, id, editable }) {
  const { cart, setCart, userData } = useContext(AppContext);
  const { palette } = useTheme();

  const page = editable ? 'checkout' : 'order_details';

  const handleRemoveItem = () => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  return (
    <TableRow>
      <TableCell
        data-testid={
          `${userData.role}_${page}__element-order-table-item-number-${index}`
        }
        sx={ {
          backgroundColor: palette.secondary.main,
          color: palette.secondary.contrastText,
          display: { xs: 'none', md: 'table-cell' },
        } }
      >
        {index + 1}
      </TableCell>
      <TableCell
        data-testid={ `${userData.role}_${page}__element-order-table-name-${index}` }
      >
        {name}
      </TableCell>
      <TableCell
        data-testid={ `${userData.role}_${page}__element-order-table-quantity-${index}` }
      >
        {quantity}
      </TableCell>
      <TableCell
        data-testid={
          `${userData.role}_${page}__element-order-table-unit-price-${index}`
        }
        sx={ { display: { xs: 'none', md: 'table-cell' } } }
      >
        {`R$ ${price.toFixed(2).replace('.', ',')}`}
      </TableCell>
      <TableCell
        data-testid={ `${userData.role}_${page}__element-order-table-sub-total-${index}` }
      >
        {`R$ ${(quantity * price).toFixed(2).replace('.', ',')}`}
      </TableCell>
      {editable && (
        <TableCell
          data-testid={ `${userData.role}_${page}__element-order-table-remove-${index}` }
          align="center"
        >
          <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={ handleRemoveItem }
            color="inherit"
            data-testid={
              `${userData.role}_${page}__element-order-table-remove-${index}`
            }
            title="Remover item"
          >
            <Delete />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
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
