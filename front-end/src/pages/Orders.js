import React from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

function Orders() {
  const errMsg = '';
  const data = [
    {
      id: 1,
      totalPrice: '2.20',
      saleDate: '2022-09-22T00:01:00.000Z',
      status: 'Em Trânsito',
    },
    {
      id: 2,
      totalPrice: '7.50',
      saleDate: '2022-09-22T00:02:00.000Z',
      status: 'Entregue',
    },
    {
      id: 3,
      totalPrice: '2.49',
      saleDate: '2022-09-22T00:03:00.000Z',
      status: 'Entregue',
    },
  ];
  return (
    <div>
      <NavBar />
      <main>
        {/* Quando o back-end estiver pronto, dar map nos pedidos retornados pela API */}
        {!!errMsg && <p>{errMsg}</p>}
        {!errMsg
          && data.map(({ id, totalPrice, saleDate, status }) => (
            <OrderCard
              key={ id }
              id={ id }
              testId={ id }
              status={ status }
              date={ saleDate }
              totalPrice={ Number(totalPrice) }
            />
          ))}
      </main>
    </div>
  );
}

export default Orders;
