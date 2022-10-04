import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../context';
import OrderDetailsListTable from './OrderDetailsListTable';

function OrderDetailsList({ editable, orderItems }) {
  const { userData } = useContext(AppContext);
  const page = editable ? 'checkout' : 'order_details';
  const { palette } = useTheme();

  return (
    <Box>
      <OrderDetailsListTable editable={ editable } orderItems={ orderItems } />
      <Paper
        sx={ {
          borderTop: `1px solid ${palette.divider}`,
          alignItems: 'flex-start',
          display: 'flex',
          justifyContent: 'center',
          padding: '16px',
        } }
      >
        <Typography variant="h6" component="span" sx={ { marginRight: '20px' } }>
          Valor total:
        </Typography>
        <Box>
          <Typography variant="h5" component="span" sx={ { marginRight: '20px' } }>
            R$
          </Typography>
          <Typography
            variant="h5"
            component="span"
            data-testid={ `${userData.role}_${page}__element-order-total-price` }
          >
            {`${orderItems
              ?.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
              .toFixed(2)
              .replace('.', ',')}`}
          </Typography>
        </Box>
      </Paper>
    </Box>
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
