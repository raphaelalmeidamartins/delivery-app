import { useTheme } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { AppContext } from '../context';

function InputNumber({ product, id }) {
  const { cart, setCart } = useContext(AppContext);
  const { palette } = useTheme();

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
    <div style={ { display: 'flex' } }>
      <IconButton
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ handleDecrement }
        sx={ {
          borderRadius: '6px 0 0 6px',
          backgroundColor: palette.secondary.main,
          color: palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: palette.secondary.light,
          },
        } }
      >
        <AiOutlineMinus />
      </IconButton>
      <input
        type="text"
        value={ quantityState }
        onChange={ handleChange }
        data-testid={ `customer_products__input-card-quantity-${id}` }
        style={ {
          border: 'unset',
          fontSize: '16px',
          textAlign: 'center',
          width: '80px',
          backgroundColor: palette.background.default,
        } }
      />
      <IconButton
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ handleIncrement }
        sx={ {
          borderRadius: '0 6px 6px 0',
          backgroundColor: palette.secondary.main,
          color: palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: palette.secondary.light,
          },
        } }
      >
        <AiOutlinePlus />
      </IconButton>
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
