import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';

function NavBarItem({ name, path, testId, onClick, button }) {
  return (
    <div>
      {button && (
        <Button
          key={ testId }
          component="button"
          type="button"
          data-testid={ testId }
          onClick={ () => onClick(path) }
          sx={ { color: 'white' } }
        >
          {name}
        </Button>
      )}
      {!button && (
        <MenuItem onClick={ () => onClick(path) }>
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
