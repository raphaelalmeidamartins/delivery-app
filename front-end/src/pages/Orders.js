import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';
import { AppContext } from '../context';
import service from '../service';

function Orders() {
  const [sales, setSales] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const { userData } = useContext(AppContext);

  const formatDateFromBank = (saleDate) => {
    const TWO_NEGATIVE = -2;
    const date = new Date(saleDate);
    const day = date.getDate();
    const month = `00${date.getMonth() + 1}`.slice(TWO_NEGATIVE);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = {};

      if (userData.role === 'customer') {
        response = await service.get.byUser(userData.token);
      } else if (userData.role === 'seller') {
        response = await service.get.bySeller(userData.token);
      }

      const { status } = response;
      const data = await response.json();

      if (status === StatusCodes.OK) {
        setErrMsg('');
        setSales(data);
      } else {
        setErrMsg(data.message);
      }
    };

    fetchData();
  }, [userData.token, userData.role]);

  return (
    <div>
      <Header />
      <main>
        {/* Quando o back-end estiver pronto, dar map nos pedidos retornados pela API */}
        {!!errMsg && <p>{errMsg}</p>}
        {!errMsg
          && sales.map(
            ({
              id,
              totalPrice,
              saleDate,
              status,
              deliveryAddress,
              deliveryNumber,
            }) => (
              <OrderCard
                key={ id }
                id={ id }
                testId={ id }
                status={ status }
                date={ formatDateFromBank(saleDate) }
                totalPrice={ Number(totalPrice) }
                fullAddress={ `${deliveryAddress}, ${deliveryNumber}` }
              />
            ),
          )}
      </main>
    </div>
  );
}

export default Orders;
