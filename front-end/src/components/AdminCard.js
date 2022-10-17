import React from 'react';
import propTypes from 'prop-types';
import { requestDelete } from '../services/requests';

function AdminCard({ users, tableId, att }) {
  const { email, id, name, role } = users;
  const elementTest = 'admin_manage__element-user-table';

  const deleteUser = async () => {
    await requestDelete(`/admin/delete/${id}`);
    att();
  };

  return (
    <div className="p-2">
      <div className="card card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <h2
            className="card-title text-yellow-700"
            data-testid={ `${elementTest}-item-number-${id}` }
          >
            {`${tableId}  ${name}`}
          </h2>
          <div className="flex gap-6">
            <h3 className="font-medium">Email</h3>
            <span className="text-center">{email}</span>
          </div>
          <div className="flex gap-7">
            <h3 className="font-medium">Role</h3>
            <span className="text-center w-3">{role}</span>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-outline btn-warning"
              data-testid={ `${elementTest}-remove-${id}` }
              id={ id }
              type="button"
              onClick={ () => deleteUser() }
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>

  // <div>
  //   <section className="card card-side bg-base-100 shadow-xl">
  //     <div className="card-body">
  //       <tr>
  //         <td data-testid={ `${elementTest}-item-number-${id}` }>
  //           {tableId}
  //         </td>
  //         <td data-testid={ `${elementTest}-name-${id}` }>
  //           {name}
  //         </td>
  //         <td data-testid={ `${elementTest}-email-${id}` }>
  //           {email}
  //         </td>
  //         <td data-testid={ `${elementTest}-role-${id}` }>
  //           {role}
  //         </td>
  //         <td>
  //           <button
  //             data-testid={ `${elementTest}-remove-${id}` }
  //             id={ id }
  //             type="button"
  //             onClick={ () => deleteUser() }
  //           >
  //             Excluir
  //           </button>
  //         </td>
  //       </tr>
  //     </div>
  //   </section>
  // </div>
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
