import React, { useEffect, useState, useContext } from 'react';
import { StatusCodes } from 'http-status-codes';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import service from '../service';
import { AppContext } from '../context';

function Orders() {
  const [sales, setSales] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const { userData } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await service.get.byUser(userData.token);
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
  }, [userData.token]);

  return (
    <div>
      <NavBar />
      <main>
        {/* Quando o back-end estiver pronto, dar map nos pedidos retornados pela API */}
        {!!errMsg && <p>{errMsg}</p>}
        {!errMsg
          && sales.map(({ id, totalPrice, saleDate, status }) => (
            <OrderCard
              key={ id }
              id={ id }
              testId={ id }
              status={ status }
              date={ new Date(saleDate) }
              totalPrice={ Number(totalPrice) }
            />
          ))}
      </main>
    </div>
  );
}

export default Orders;
