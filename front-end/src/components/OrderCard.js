import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import OrderStatus from './OrderStatus';

function OrderCard({ id, status, date, totalPrice, testId, fullAddress }) {
  const { userData } = useContext(AppContext);
  const FOUR_NEGATIVE = -4;

  const navigate = useNavigate();

  return (
    <section style={ { border: '1px solid black' } }>
      <button
        type="button"
        onClick={ () => navigate(`/${userData.role}/orders/${id}`) }
      >
        <span
          data-testid={ `${userData.role}_orders__element-order-id-${testId}` }
        >
          {`Pedido ${`0000${id}`.slice(FOUR_NEGATIVE)}`}
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
            {`${totalPrice.toFixed(2).replace('.', ',')}`}
          </span>
          <span
            data-testid={ `${userData.role}_orders__element-card-address-${testId}` }
          >
            {userData.role === 'seller' && fullAddress}
          </span>
        </div>
      </button>
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
  fullAddress: PropTypes.string.isRequired,
};

export default OrderCard;
