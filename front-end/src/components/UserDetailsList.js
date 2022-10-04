import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import UserDetailsListItem from './UserDetailsListItem';

function UserDetailsList({ users }) {
  const DISPLAY_TABLE_CELL = 'table-cell';
  const { palette } = useTheme();

  return (
    <Paper>
      <Table component="table">
        <TableHead>
          <TableRow
            sx={ {
              '*': {
                borderBottom: `1px solid ${palette.divider}`,
              },
            } }
          >
            <TableCell
              variant="head"
              sx={ {
                display: { xs: 'none', md: DISPLAY_TABLE_CELL },
                width: '50px',
              } }
            >
              Item
            </TableCell>
            <TableCell variant="head" sx={ { width: '100px' } }>
              Nome
            </TableCell>
            <TableCell variant="head" sx={ { width: '100px' } }>
              E-mail
            </TableCell>
            <TableCell variant="head" sx={ { width: '100px' } }>
              Tipo
            </TableCell>
            <TableCell variant="head" sx={ { width: '100px' } }>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user, index) => (
            <UserDetailsListItem key={ user.id } index={ index } { ...user } />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

UserDetailsList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default UserDetailsList;
