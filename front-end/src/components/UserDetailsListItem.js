import { Delete } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../context';
import service from '../service';

function UserDetailsListItem({ index, name, email, role, id }) {
  const { userData } = useContext(AppContext);
  const handleRemoveUser = async (userId) => {
    await service.delete.deleteUser(userData.token, userId);
  };

  return (
    <TableRow>
      <TableCell
        data-testid={
          `admin_manage__element-user-table-item-number-${index}`
        }
      >
        {index + 1}
      </TableCell>
      <TableCell
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        {name}
      </TableCell>
      <TableCell
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        {email}
      </TableCell>
      <TableCell
        data-testid={
          `admin_manage__element-user-table-role-${index}`
        }
      >
        {role}
      </TableCell>
      <TableCell
        data-testid={ `admin_manage__element-user-table-remove-${index}` }
      >
        <IconButton
          size="large"
          aria-haspopup="true"
          onClick={ () => handleRemoveUser(id) }
          color="inherit"
          data-testid={ `admin_manage__element-user-table-remove-${index}` }
          title="Remover item"
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

UserDetailsListItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default UserDetailsListItem;
