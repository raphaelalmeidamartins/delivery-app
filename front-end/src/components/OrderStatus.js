import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../context';

function OrderStatus({ status, testId }) {
  const { userData } = useContext(AppContext);

  const displayText = {
    Pendente: 'Pendente',
    Preparando: 'Preparando',
    Entregue: 'Entregue',
    'Em Trânsito': 'Em Trânsito',
  };

  return (
    <span
      style={ { border: '1px solid black' } }
      data-testid={ `${userData.role}_orders__element-delivery-status-${testId}` }
    >
      {displayText[status]}
    </span>
  );
}

OrderStatus.propTypes = {
  testId: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'])
    .isRequired,
};

export default OrderStatus;
