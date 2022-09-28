import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../context';
import OrderStatus from './OrderStatus';

function OrderCard({ id, status, date, totalPrice, testId }) {
  const { userData } = useContext(AppContext);
  return (
    <section style={ { border: '1px solid black' } }>
      <span data-testid={ `${userData.role}_orders__element-order-id-${testId}` }>
        {id}
      </span>
      <OrderStatus status={ status } testId={ testId } />
      <div>
        <span
          data-testid={ `${userData.role}_orders__element-order-date-${testId}` }
        >
          {date}
        </span>
        <span
          data-testid={ `${userData.role}_orders__element-card-price-${testId}` }
        >
          {`R$ ${totalPrice.toFixed(2)}`}
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
