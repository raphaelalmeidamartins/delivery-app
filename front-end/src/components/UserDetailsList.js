import PropTypes from 'prop-types';
import React from 'react';
import UserDetailsListItem from './UserDetailsListItem';

function UserDetailsList({ users }) {
  return (
    <div>
      <table style={ { border: '1px solid black' } }>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <UserDetailsListItem key={ user.id } index={ index } { ...user } />
          ))}
        </tbody>
      </table>
    </div>
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
