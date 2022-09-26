import React from 'react';
import NavBar from '../components/NavBar';
import OrderDetailsList from '../components/OrderDetailsList';

function OrderDetails() {
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
        <OrderDetailsList orderItems={ placeholderItems } editable />
      </main>
    </div>
  );
}

export default OrderDetails;
