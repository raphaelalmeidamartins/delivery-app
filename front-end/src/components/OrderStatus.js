import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../context';

function OrderStatus({ status, testId }) {
  const { userData } = useContext(AppContext);

  const displayText = {
    pending: 'PENDENTE',
    preparing: 'PREPARANDO',
    delivered: 'ENTREGUE',
  };

  return (
    <span
      data-testid={ `${userData.role}_orders__element-delivery-status-${testId}` }
    >
      {displayText[status]}
    </span>
  );
}

OrderStatus.propTypes = {
  testId: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['pending', 'preparing', 'delivered']).isRequired,
};

export default OrderStatus;
