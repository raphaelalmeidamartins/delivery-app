import { Button, Paper, Typography, useTheme } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import { RiShoppingBagFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import OrderDetailsList from '../components/OrderDetailsList';
import OrderStatus from '../components/OrderStatus';
import Wrapper from '../components/Wrapper';
import { AppContext } from '../context';
import service from '../service';

function OrderDetails() {
  const { userData } = useContext(AppContext);
  const { typography } = useTheme();
  const { id } = useParams();
  const [sale, setSale] = useState({});
  const [errMsg, setErrMsg] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await service.get.bySaleId(userData.token, id);

      const { status } = response;
      const data = await response.json();
      const products = data.products.map(
        ({ id: saleId, name, price, SalesProducts: { quantity } }) => ({
          id: saleId,
          name,
          price: +price,
          quantity,
        }),
      );

      if (status === StatusCodes.OK) {
        setErrMsg('');
        setSale(data);
        setItems(products);
      } else {
        setErrMsg(data.message);
      }
    };

    fetchData();
  }, [userData.token, id]);

  const handleUpdateStatus = async (status) => {
    const response = await service.put.updateSaleById(userData?.token, id, status);
    if (response.status === StatusCodes.NO_CONTENT) {
      setSale({ ...sale, status });
    }
  };

  const FOUR_NEGATIVE = -4;
  const formatDateFromBank = (saleDate) => {
    const TWO_NEGATIVE = -2;
    const date = new Date(saleDate);
    const day = date.getDate();
    const month = `00${date.getMonth() + 1}`.slice(TWO_NEGATIVE);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const { role } = userData;

  return (
    <Wrapper>
      <Header />
      {!!errMsg && <p>{errMsg}</p>}
      {!errMsg && !!Object.keys(sale).length && (
        <>
          <section>
            <Typography component="h2" variant="h4" gutterBottom>
              <RiShoppingBagFill />
              {' '}
              Detalhe do Pedido
            </Typography>
            <Paper
              elevation={ 0 }
              sx={ {
                alignItems: 'center',
                marginBottom: '24px',
                padding: '14px 20px',
                borderRadius: '8px',
                '*:not(:last-child)': {
                  marginRight: '14px',
                },
                display: 'flex',
                flexFlow: 'row wrap',
              } }
            >
              <span
                data-testid={
                  `${role}_order_details__element-order-details-label-order-id`
                }
                sx={ { marginRight: '30px' } }
              >
                <span>Pedido</span>
                {' '}
                <span style={ { fontWeight: 700, fontSize: '20px' } }>
                  {`${`0000${id}`.slice(FOUR_NEGATIVE)}`}
                </span>
              </span>
              {role === 'customer'
                && (
                  <span
                    data-testid={
                      `${role}_order_details__element-order-details-label-seller-name`
                    }
                  >
                    P. Vend:
                    {' '}
                    {sale.seller.name}
                  </span>
                )}
              <span
                data-testid={
                  `${role}_order_details__element-order-details-label-order-date`
                }
              >
                {formatDateFromBank(sale.saleDate)}
              </span>
              <OrderStatus
                status={ sale.status }
                testId={ 0 }
                sx={ {
                  borderRadius: '4px',
                  width: '220px',
                  height: '36.5px',
                } }
              />
              {role === 'customer'
                && (
                  <Button
                    data-testid={
                      `${role}_order_details__button-delivery-check`
                    }
                    variant="contained"
                    color="success"
                    type="button"
                    disabled={ !sale.status.includes('Em Trânsito') }
                    onClick={ () => handleUpdateStatus('Entregue') }
                  >
                    MARCAR COMO ENTREGUE
                  </Button>
                )}
              {role === 'seller'
                && (
                  <>
                    <Button
                      data-testid={
                        `${role}_order_details__button-preparing-check`
                      }
                      variant="contained"
                      color="warning"
                      type="button"
                      disabled={ !sale.status.includes('Pendente') }
                      onClick={ () => handleUpdateStatus('Preparando') }
                    >
                      PREPARAR PEDIDO
                    </Button>
                    <Button
                      data-testid={
                        `${role}_order_details__button-dispatch-check`
                      }
                      variant="contained"
                      type="button"
                      color="success"
                      disabled={ !sale.status.includes('Preparando') }
                      onClick={ () => handleUpdateStatus('Em Trânsito') }
                    >
                      SAIU PARA ENTREGA
                    </Button>
                  </>
                )}
            </Paper>
          </section>
          <OrderDetailsList orderItems={ items } />
        </>
      )}
    </Wrapper>
  );
}

export default OrderDetails;
