import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { AppContext } from '../context';

function InputNumber({ product, id }) {
  const { cart, setCart } = useContext(AppContext);

  const getItemQuantity = (arrayCart) => {
    const cartItem = arrayCart.find((item) => item.id === id);
    if (!cartItem) return 0;
    return cartItem.quantity;
  };

  const [quantityState, setQuantityState] = useState(getItemQuantity(cart));

  const removeNullItems = (arrayCart) => arrayCart.filter((item) => item.quantity > 0);

  const handleDecrement = () => {
    const index = cart.findIndex((item) => item.id === id);
    const notFoundIndex = -1;

    if (index !== notFoundIndex && cart[index]?.quantity > 0) {
      const updatedCart = [...cart];
      updatedCart[index].quantity -= 1;
      setQuantityState(updatedCart[index].quantity);
      setCart(removeNullItems(updatedCart));
    }
  };

  const handleIncrement = () => {
    const index = cart.findIndex((item) => item.id === id);
    const notFoundIndex = -1;

    if (index !== notFoundIndex) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
      setQuantityState(updatedCart[index].quantity);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      setQuantityState(1);
    }
  };

  const handleChange = ({ target: { value } }) => {
    const inputValue = !Number.isNaN(+value) ? +value : 0;
    const index = cart.findIndex((item) => item.id === id);
    const notFoundIndex = -1;

    if (index !== notFoundIndex) {
      const updatedCart = [...cart];
      updatedCart[index].quantity = inputValue;
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: inputValue }];
      setCart(updatedCart);
    }

    setQuantityState(inputValue);
  };

  return (
    <div>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ handleDecrement }
      >
        -
      </button>
      <input
        type="text"
        value={ quantityState }
        onChange={ handleChange }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ handleIncrement }
      >
        +
      </button>
    </div>
  );
}

InputNumber.propTypes = {
  id: PropTypes.number.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default InputNumber;
