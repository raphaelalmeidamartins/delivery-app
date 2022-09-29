import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';

function NavBar() {
  const { userData, setUserData } = useContext(AppContext);

  const handleLogout = () => {
    setUserData({});
  };

  const navigate = useNavigate();

  return (
    <header style={ { border: '1px solid black' } }>
      <nav>
        <ul>
          {userData?.role === 'customer' && (
            <>
              <li>
                <Button
                  component="button"
                  type="button"
                  variant="outlined"
                  data-testid="customer_products__element-navbar-link-products"
                  onClick={ () => navigate('/customer/products') }
                >
                  PRODUTOS
                </Button>
              </li>
              <li>
                <Button
                  component="button"
                  type="button"
                  variant="outlined"
                  data-testid="customer_products__element-navbar-link-orders"
                  onClick={ () => navigate('/customer/orders') }
                >
                  MEUS PEDIDOS
                </Button>
              </li>
            </>
          )}
          {userData?.role === 'seller' && (
            <li>
              <Button
                component="button"
                type="button"
                variant="outlined"
                data-testid="customer_products__element-navbar-link-orders"
                onClick={ () => navigate('/seller/orders') }
              >
                PEDIDOS
              </Button>
            </li>
          )}
          {userData?.role === 'admin' && (
            <li>
              <Button
                component="button"
                type="button"
                variant="outlined"
                data-testid="customer_products__element-navbar-link-orders"
                onClick={ () => navigate('/seller/orders') }
              >
                GERENCIAR USUÁRIOS
              </Button>
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
