import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import OrderDetailsList from '../components/OrderDetailsList';
import { AppContext } from '../context';
import service from '../service';

function OrderDetails() {
  const { userData } = useContext(AppContext);
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
    <div>
      <Header />
      <main>
        {!!errMsg && <p>{errMsg}</p>}
        {!errMsg && !!Object.keys(sale).length && (
          <>
            <section>
              <h2>Detalhe do Pedido</h2>
              <div>
                <span
                  data-testid={
                    `${role}_order_details__element-order-details-label-order-id`
                  }
                >
                  {`Pedido ${`0000${id}`.slice(FOUR_NEGATIVE)}`}
                </span>
                {role === 'customer'
                && (
                  <span
                    data-testid={
                      `${role}_order_details__element-order-details-label-seller-name`
                    }
                  >
                    P. Vend:
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
                <span
                  data-testid={
                    `${role}_order_details__element-order-details-label-delivery-status`
                  }
                >
                  {sale.status}
                </span>
                {role === 'customer'
                && (
                  <button
                    data-testid={
                      `${role}_order_details__button-delivery-check`
                    }
                    type="button"
                    disabled={ !sale.status.includes('Em Trânsito') }
                    onClick={ () => handleUpdateStatus('Entregue') }
                  >
                    MARCAR COMO ENTREGUE
                  </button>
                )}
                {role === 'seller'
                && (
                  <div>
                    <button
                      data-testid={
                        `${role}_order_details__button-preparing-check`
                      }
                      type="button"
                      disabled={ !sale.status.includes('Pendente') }
                      onClick={ () => handleUpdateStatus('Preparando') }
                    >
                      PREPARAR PEDIDO
                    </button>
                    <button
                      data-testid={
                        `${role}_order_details__button-dispatch-check`
                      }
                      type="button"
                      disabled={ !sale.status.includes('Preparando') }
                      onClick={ () => handleUpdateStatus('Em Trânsito') }
                    >
                      SAIU PARA ENTREGA
                    </button>
                  </div>
                )}
              </div>
            </section>
            <OrderDetailsList orderItems={ items } />
          </>
        )}
      </main>
    </div>
  );
}

export default OrderDetails;
