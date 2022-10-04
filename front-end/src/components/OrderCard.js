import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import OrderStatus from './OrderStatus';

function OrderCard({ id, status, date, totalPrice, testId, fullAddress }) {
  const { userData } = useContext(AppContext);
  const { palette, typography } = useTheme();
  const FOUR_NEGATIVE = -4;

  const navigate = useNavigate();

  const [elevation, setElevation] = useState();

  const HIGH_ELEVATION = 4;

  return (
    <Paper
      elevation={ elevation }
      onMouseEnter={ () => setElevation(HIGH_ELEVATION) }
      onMouseLeave={ () => setElevation(1) }
      component="button"
      type="button"
      onClick={ () => navigate(`/${userData.role}/orders/${id}`) }
      sx={ {
        borderRadius: '4px',
        border: 'unset',
        backgroundColor: palette.background.paper,
        cursor: 'pointer',
        display: 'flex',
        padding: '16px',
        width: '100%',
        height: '100%',
        ...typography.body1,
      } }
    >
      <Grid
        container
        spacing={ { xs: 4, sm: 4, md: 4 } }
        columns={ { xs: 12, sm: 12, md: 12 } }
      >
        <Grid
          item
          xs={ 3 }
          sm={ 3 }
          md={ 3 }
          component="span"
          data-testid={ `${userData.role}_orders__element-order-id-${testId}` }
        >
          <Box
            sx={ {
              backgroundColor: palette.chip.main,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              display: 'flex',
              flexFlow: 'column nowrap',
              padding: '8px',
              height: '80px',
            } }
          >
            <span>Pedido</span>
            <span style={ { fontWeight: 700, fontSize: '20px' } }>
              {`${`0000${id}`.slice(FOUR_NEGATIVE)}`}
            </span>
          </Box>
        </Grid>
        <Grid item xs={ 5 } sm={ 5 } md={ 5 }>
          <OrderStatus status={ status } testId={ testId } />
        </Grid>
        <Grid item xs={ 4 } sm={ 4 } md={ 4 }>
          <Box
            sx={ {
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              height: '100%',
            } }
          >
            <span
              data-testid={ `${userData.role}_orders__element-order-date-${testId}` }
              style={ {
                backgroundColor: palette.divider,
                borderRadius: '8px',
                display: 'flex',
                padding: '8px 14px',
                fontWeight: 700,
              } }
            >
              {date}
            </span>
            <span
              data-testid={ `${userData.role}_orders__element-card-price-${testId}` }
              style={ {
                backgroundColor: palette.divider,
                borderRadius: '8px',
                display: 'flex',
                padding: '8px 14px',
                fontWeight: 700,
              } }
            >
              {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
            </span>
          </Box>
        </Grid>
        {userData.role === 'seller' && fullAddress && (
          <Grid item xs={ 12 } sm={ 12 } md={ 12 }>
            <Box
              sx={ {
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              } }
            >
              <span
                data-testid={ `${userData.role}_orders__element-card-address-${testId}` }
                style={ {
                  padding: '8px 14px',
                  fontStyle: 'italic',
                  display: 'block',
                } }
              >
                {fullAddress}
              </span>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

OrderCard.propTypes = {
  testId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'])
    .isRequired,
  totalPrice: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  fullAddress: PropTypes.string.isRequired,
};

export default OrderCard;
