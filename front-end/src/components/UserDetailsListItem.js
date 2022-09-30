import Button from '@mui/material/Button';
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
    <tr>
      <td
        data-testid={
          `admin_manage__element-user-table-item-number-${index}`
        }
      >
        {index + 1}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        {email}
      </td>
      <td
        data-testid={
          `admin_manage__element-user-table-role-${index}`
        }
      >
        {role}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-remove-${index}` }
      >
        <Button
          type="button"
          onClick={ () => handleRemoveUser(id) }
          data-testid={ `admin_manage__element-user-table-remove-${index}` }
        >
          Remover
        </Button>
      </td>
    </tr>
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
