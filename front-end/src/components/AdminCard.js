import React from 'react';
import propTypes from 'prop-types';
import { requestDelete } from '../services/requests';

function AdminCard({ users, tableId, att }) {
  const { email, id, name, role } = users;

  const deleteUser = async () => {
    await requestDelete(`/admin/delete/${id}`);
    att();
  };

  return (
    <tr>
      <td data-testid={ `admin_manage__element-user-table-item-number-${id}` }>
        {tableId}
      </td>
      <td data-testid={ `admin_manage__element-user-table-name-${id}` }>
        {name}
      </td>
      <td data-testid={ `admin_manage__element-user-table-email-${id}` }>
        {email}
      </td>
      <td data-testid={ `admin_manage__element-user-table-role-${id}` }>
        {role}
      </td>
      <td>
        <button
          data-testid={ `admin_manage__element-user-table-remove-${id}` }
          id={ id }
          type="button"
          onClick={ () => deleteUser() }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

AdminCard.propTypes = {
  users: propTypes.shape({
    email: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    role: propTypes.string.isRequired,
  }).isRequired,
  tableId: propTypes.number.isRequired,
  att: propTypes.func.isRequired,
};

export default AdminCard;
