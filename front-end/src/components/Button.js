import PropTypes from 'prop-types';
import React from 'react';

function Button({ styles, onClick, title }) {
  return (
    <button type="button" className={ styles } onClick={ onClick }>
      { title }
    </button>
  );
}

Button.propTypes = {
  styles: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
