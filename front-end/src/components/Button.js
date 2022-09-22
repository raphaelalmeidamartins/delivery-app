import PropTypes from 'prop-types';
import React from 'react';

function Button({ styles, onClick, title, disabled, variant }) {
  return (
    <button
      type="submit"
      disabled={ disabled }
      className={ styles }
      onClick={ onClick }
      variant={ variant }
    >
      { title }
    </button>
  );
}

Button.propTypes = {
  styles: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Button;
