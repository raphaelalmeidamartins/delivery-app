import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Container from '@mui/system/Container';
import PropTypes from 'prop-types';
import React from 'react';

function Wrapper({ children, sx, bgSx }) {
  const { palette } = useTheme();

  return (
    <Box
      sx={ {
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: palette.background.default,
        ...bgSx,
      } }
    >
      <Container
        component="main"
        sx={ {
          paddingTop: { xs: '100px', md: '140px' },
          paddingBottom: '70px',
          position: 'relative',
          ...sx,
        } }
      >
        {children}
      </Container>
    </Box>
  );
}

Wrapper.defaultProps = {
  sx: {},
  bgSx: {},
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  sx: PropTypes.objectOf(PropTypes.string),
  bgSx: PropTypes.objectOf(PropTypes.string),
};

export default Wrapper;
