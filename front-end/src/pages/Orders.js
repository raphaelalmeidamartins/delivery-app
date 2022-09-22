import React from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

function Orders() {
  return (
    <div>
      <NavBar />
      <main>
        {/* Quando o back-end estiver pronto, dar map nos pedidos retornados pela API */}
        <OrderCard
          id={ 1 }
          testId={ 1 }
          status="pending"
          date="22/09/2022"
          totalPrice={ 10.22 }
        />
      </main>
    </div>
  );
}

export default Orders;
