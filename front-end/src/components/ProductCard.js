import PropTypes from 'prop-types';
import React from 'react';
import InputNumber from './InputNumber';

function ProductCard({ price, thumbnail, name, id }) {
  return (
    <section style={ { border: '1px solid black' } }>
      <span data-testid={ `customer_products__element-card-price-${id}` }>
        {`R$ ${price.toFixed(2).replace('.', ',')}`}
      </span>
      <img
        style={ { width: '100px', objectFit: 'contain' } }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ thumbnail }
        alt="prévia do produto"
      />
      <span data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </span>
      <InputNumber
        product={ { price, thumbnail, name, id } }
        id={ id }
      />
    </section>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ProductCard;
