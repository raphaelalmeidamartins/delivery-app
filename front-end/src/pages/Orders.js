import { Grid } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';
import Wrapper from '../components/Wrapper';
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
    <Wrapper>
      <Header />
      {!!errMsg && <p>{errMsg}</p>}
      <Grid
        container
        spacing={ { xs: 4, sm: 4, md: 4 } }
        columns={ { xs: 4, sm: 8, md: 12 } }
      >
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
              <Grid item key={ id } xs={ 4 } sm={ 8 } md={ 6 }>
                <OrderCard
                  id={ id }
                  testId={ id }
                  status={ status }
                  date={ formatDateFromBank(saleDate) }
                  totalPrice={ Number(totalPrice) }
                  fullAddress={ `${deliveryAddress}, ${deliveryNumber}` }
                />
              </Grid>
            ),
          )}
      </Grid>
    </Wrapper>
  );
}

export default Orders;
