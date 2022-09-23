import Container from '@mui/system/Container';
import PropTypes from 'prop-types';
import React from 'react';

function Wrapper({ children }) {
  return <Container component="section">{children}</Container>;
}

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Wrapper;
