import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
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
      const products = data.products
        .map(({ id: saleId, name, price, SalesProducts: { quantity } }) => ({
          id: saleId, name, price: +price, quantity,
        }));

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

  return (
    <div>
      <NavBar />
      <main>
        {!!errMsg && <p>{errMsg}</p>}
        {!errMsg && !!Object.keys(sale).length && (
          <>
            <section>
              <h2>Detalhe do Pedido</h2>
              <div>
                <span>
                  PEDIDO
                  {' '}
                  {id}
                </span>
                <span>
                  P. Vendedora
                  {' '}
                  {sale.seller.name }
                </span>
                <span>
                  {' '}
                  {sale.date }
                </span>
                <span>
                  {' '}
                  {sale.status }
                </span>
                <button type="submit">MARCAR COMO ENTREGUE</button>
              </div>
            </section>
            <OrderDetailsList
              orderItems={ items }
              editable
            />
          </>)}

      </main>
    </div>
  );
}

export default OrderDetails;
