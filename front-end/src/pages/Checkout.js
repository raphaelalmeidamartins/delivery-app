import React from 'react';
import NavBar from '../components/NavBar';
import OrderDetailsList from '../components/OrderDetailsList';

function Checkout() {
  const placeholderItems = [
    {
      id: 1,
      name: 'Placeholder1',
      quantity: 2,
      price: 15.50,
    },
    {
      id: 2,
      name: 'Placeholder2',
      quantity: 3,
      price: 25.50,
    },
  ];

  return (
    <div>
      <NavBar />
      <main>
        <section>
          <h2>Finalizar pedido</h2>
          <OrderDetailsList orderItems={ placeholderItems } />
        </section>
        <form>
          <h2>Detalhes e Endereço para entrega</h2>
          {/* inserir formulário de entrega aqui */}
        </form>
      </main>
    </div>
  );
}

export default Checkout;
