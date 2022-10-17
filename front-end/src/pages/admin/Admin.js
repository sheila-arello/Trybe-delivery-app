import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Header from '../../components/Header';
import AdminCard from '../../components/AdminCard';
import { requestData, setToken } from '../../services/requests';
import AdminRegister from '../../components/AdminRegister';

function Admin(props) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState('');

  const { history: { location: { pathname } } } = props;

  const userType = pathname.includes('admin') ? 'administrator' : '';
  const screenType = pathname.includes('admin') ? 'admin' : '';

  const getUsers = async () => {
    try {
      const response = await requestData('/admin/manage');
      setUsers(response);
      setError(false);
    } catch (err) {
      console.log(err);
    }
  };

  const att = () => {
    getUsers();
  };

  useEffect(() => {
    const { token, name } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    console.log(users);
    if (name) setUserName(name);
    getUsers();
  }, []);

  return (
    <div>
      <Header screenType={ screenType } userName={ userName } userType={ userType } />
      {error
        ? (
          <span
            data-testid="admin_manage__element-invalid-register"
            className="span"
          >
            { error }
          </span>
        ) : ''}
      <AdminRegister att={ att } className="App" />
      <div>
        {users ? users.map((element, index) => (
          <AdminCard
            key={ element.id }
            users={ element }
            tableId={ index + 1 }
            att={ att }
          />
        )) : 'Loading'}
      </div>
      {/* <table>
        <caption>Lista de usuários</caption>
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
          {users ? users.map((element, index) => (
            <AdminCard
              key={ element.id }
              users={ element }
              tableId={ index + 1 }
              att={ att }
            />
          )) : 'Loading'}
        </tbody>
      </table> */}
    </div>
  );
}

Admin.propTypes = {
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Admin;
