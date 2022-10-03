import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import OrderDetailsList from '../components/OrderDetailsList';
import Wrapper from '../components/Wrapper';
import { AppContext } from '../context';
import service from '../service';

function Checkout() {
  const [sellers, setSellers] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

  const { userData, cart, setCart } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await service.get.sellers();

      const { status } = response;
      const data = await response.json();

      if (status === StatusCodes.OK) {
        setErrMsg('');
        setSellers(data);
        setSeller(data[0].id);
      } else {
        setErrMsg(data.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    const salesValues = {
      seller: () => setSeller(value),
      address: () => setAddress(value),
      addressNumber: () => setAddressNumber(value),
    };
    salesValues[name]();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // implementar a lógica da API aqui
    const response = await service.post.sales(userData?.token, {
      sellerId: +seller,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      products: cart.map(({ id, quantity }) => ({ id, quantity })),
    });

    const { status } = response;
    const data = await response.json();

    // Alterar o conteúdo do if/else
    if (status === StatusCodes.CREATED) {
      setCart([]);
      navigate(`/customer/orders/${data.saleId}`);
    } else {
      setErrMsg(errMsg);
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        {!!errMsg && <p>{errMsg}</p>}
        {!errMsg && !cart.length && (
          <Typography variant="h6" align="center" paragraph>
            Seu carrinho está vazio
          </Typography>
        )}
        {!errMsg && !!cart.length && (
          <>
            <section>
              <Typography component="h2" variant="h2" gutterBottom>
                Finalizar pedido
              </Typography>
              <OrderDetailsList orderItems={ cart } editable />
            </section>
            <Box component="form" onSubmit={ handleSubmit }>
              <Typography component="h2" variant="h2" gutterBottom>
                Detalhes e Endereço para entrega
              </Typography>
              <FormControl>
                <label htmlFor="seller-select">
                  P. Vendedora Responsável
                  <select
                    id="seller-select"
                    data-testid="customer_checkout__select-seller"
                    name="seller"
                    value={ seller }
                    onChange={ handleChange }
                  >
                    {sellers?.map(({ id, name }) => (
                      <option key={ id } value={ id }>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
              </FormControl>
              <FormControl>
                <TextField
                  variant="filled"
                  label="Endereço"
                  required
                  type="text"
                  name="address"
                  value={ address }
                  onChange={ handleChange }
                  inputProps={ {
                    'data-testid': 'customer_checkout__input-address',
                  } }
                />
              </FormControl>
              <FormControl>
                <TextField
                  variant="filled"
                  label="Número"
                  required
                  type="text"
                  name="addressNumber"
                  value={ addressNumber }
                  onChange={ handleChange }
                  inputProps={ {
                    'data-testid': 'customer_checkout__input-address-number',
                  } }
                />
              </FormControl>
              <Button
                component="button"
                type="submit"
                variant="outlined"
                data-testid="customer_checkout__button-submit-order"
                disabled={ !(address && addressNumber) }
                onClick={ handleSubmit }
              >
                FINALIZAR PEDIDO
              </Button>
            </Box>
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Checkout;
