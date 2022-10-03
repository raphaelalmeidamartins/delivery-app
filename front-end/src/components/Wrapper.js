import Container from '@mui/system/Container';
import PropTypes from 'prop-types';
import React from 'react';

function Wrapper({ children }) {
  return (
    <Container
      component="main"
      sx={ { padding: '70px 0', position: 'relative' } }
    >
      {children}
    </Container>
  );
}

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Wrapper;
