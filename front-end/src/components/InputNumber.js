import React, { useState } from 'react';

function InputNumber() {
  const [quantity, setQuantity] = useState(0);

  const handleDecrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleIncrement = () => setQuantity(quantity + 1);

  return (
    <div>
      <button type="button" onClick={ handleDecrement }>
        -
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={ handleIncrement }>
        +
      </button>
    </div>
  );
}

export default InputNumber;
