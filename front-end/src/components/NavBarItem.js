import { MenuItem, SvgIcon, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { FaBeer } from 'react-icons/fa';
import { RiShoppingBagFill } from 'react-icons/ri';

function NavBarItem({ name, path, testId, onClick, button }) {
  const { palette } = useTheme();

  const icons = {
    Produtos: (
      <SvgIcon sx={ { marginRight: '8px' } }>
        <FaBeer />
      </SvgIcon>
    ),
    'Meus Pedidos': (
      <SvgIcon sx={ { marginRight: '8px' } }>
        <RiShoppingBagFill />
      </SvgIcon>
    ),
    Pedidos: (
      <SvgIcon sx={ { marginRight: '8px' } }>
        <RiShoppingBagFill />
      </SvgIcon>
    ),
  };

  return (
    <div>
      {button && (
        <Button
          key={ testId }
          component="button"
          type="button"
          data-testid={ testId }
          onClick={ () => onClick(path) }
          sx={ { color: palette.primary.contrastText } }
        >
          {icons[name]}
          {name}
        </Button>
      )}
      {!button && (
        <MenuItem onClick={ () => onClick(path) }>
          {icons[name]}
          <Button variant="text" type="button">
            {name}
          </Button>
        </MenuItem>
      )}
    </div>
  );
}

NavBarItem.defaultProps = {
  button: false,
};

NavBarItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  button: PropTypes.bool,
};

export default NavBarItem;
