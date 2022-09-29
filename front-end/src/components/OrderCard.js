import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../context';
import OrderStatus from './OrderStatus';

function OrderCard({ id, status, date, totalPrice, testId }) {
  const { userData } = useContext(AppContext);
  const FOUR_NEGATIVE = -4;
  const TWO_NEGATIVE = -2;

  return (
    <section style={ { border: '1px solid black' } }>
      <span data-testid={ `${userData.role}_orders__element-order-id-${testId}` }>
        {`Pedido ${`0000${id}`.slice(FOUR_NEGATIVE)}`}
      </span>
      <OrderStatus status={ status } testId={ testId } />
      <div>
        <span
          data-testid={ `${userData.role}_orders__element-order-date-${testId}` }
        >
          {`${date.getDate()}/${`00${date.getMonth() + 1}`.slice(
            TWO_NEGATIVE,
          )}/${date.getFullYear()}`}
        </span>
        <span
          data-testid={ `${userData.role}_orders__element-card-price-${testId}` }
        >
          {`${totalPrice.toFixed(2).replace('.', ',')}`}
        </span>
      </div>
    </section>
  );
}

OrderCard.propTypes = {
  testId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'])
    .isRequired,
  totalPrice: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default OrderCard;
