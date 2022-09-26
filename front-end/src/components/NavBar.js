import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context';

function NavBar() {
  const {
    userData,
    setUserData,
  } = useContext(AppContext);

  const handleLogout = () => {
    setUserData({});
  };

  return (
    <header style={ { border: '1px solid black' } }>
      <nav>
        <ul>
          {userData?.role === 'customer' && (
            <>
              <li data-testid="customer_products__element-navbar-link-products">
                <NavLink to="/customer/products">PRODUTOS</NavLink>
              </li>
              <li data-testid="customer_products__element-navbar-link-orders">
                <NavLink to="/customer/orders">MEUS PEDIDOS</NavLink>
              </li>
            </>
          )}
          {userData?.role === 'seller' && (
            <li data-testid="customer_products__element-navbar-link-orders">
              <NavLink to="seller/orders">PEDIDOS</NavLink>
            </li>
          )}
          {userData?.role === 'admin' && (
            <li data-testid="customer_products__element-navbar-link-orders">
              GERENCIAR USUÁRIOS
            </li>
          )}
        </ul>
        <section>
          <span data-testid="customer_products__element-navbar-user-full-name">
            {userData?.name}
          </span>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ handleLogout }
          >
            Sair
          </button>
        </section>
      </nav>
    </header>
  );
}

export default NavBar;
