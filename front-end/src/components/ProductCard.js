import PropTypes from 'prop-types';
import React from 'react';
import InputNumber from './InputNumber';

function ProductCard({ price, thumbnail, name, testId }) {
  return (
    <section style={ { border: '1px solid black' } }>
      <span data-testid={ `customer_products__element-card-price-${testId}` }>
        {`R$ ${price.toFixed(2)}`}
      </span>
      <img
        data-testid={ `customer_products__img-card-bg-image-${testId}` }
        src={ thumbnail }
        alt="prévia do produto"
      />
      <span data-testid={ `customer_products__element-card-title-${testId}` }>
        {name}
      </span>
      <InputNumber />
    </section>
  );
}

ProductCard.propTypes = {
  testId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ProductCard;
