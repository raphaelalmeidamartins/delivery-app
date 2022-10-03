import Container from '@mui/system/Container';
import PropTypes from 'prop-types';
import React from 'react';

function Wrapper({ children }) {
  return (
    <Container
      component="main"
      sx={ { paddingTop: '140px', paddingBottom: '70px', position: 'relative' } }
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
