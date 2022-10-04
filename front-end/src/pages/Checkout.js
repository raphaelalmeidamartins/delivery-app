import { Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useEffect, useState } from 'react';
import { MdShoppingCart, MdSportsMotorsports } from 'react-icons/md';
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

  const INPUT_SPACING = '24px';

  return (
    <Wrapper>
      <Header />
      {!!errMsg && <p>{errMsg}</p>}
      {!errMsg && !cart.length && (
        <Typography variant="h6" align="center" paragraph>
          Seu carrinho está vazio
        </Typography>
      )}
      {!errMsg && !!cart.length && (
        <Grid
          container
          spacing={ { xs: 5, sm: 5, md: 5 } }
          columns={ { xs: 4, sm: 4, md: 12 } }
          component="section"
        >
          <Grid item xs={ 4 } sm={ 4 } md={ 8 }>
            <Typography component="h2" variant="h4" gutterBottom>
              <MdShoppingCart />
              {' '}
              Finalizar pedido
            </Typography>
            <OrderDetailsList orderItems={ cart } editable />
          </Grid>
          <Grid
            component="form"
            onSubmit={ handleSubmit }
            item
            xs={ 4 }
            sm={ 4 }
            md={ 4 }
            sx={ {
              display: 'flex',
              flexFlow: 'column nowrap',
            } }
          >
            <Typography
              component="h3"
              variant="h4"
              gutterBottom
              sx={ { marginBottom: INPUT_SPACING } }
            >
              <MdSportsMotorsports />
              {' '}
              Detalhes
            </Typography>
            <FormControl sx={ { marginBottom: INPUT_SPACING } }>
              <InputLabel id="seller-select-label">
                P. Vendedora Responsável
              </InputLabel>
              <Select
                id="seller-select"
                name="seller"
                labelId="seller-select-label"
                value={ seller }
                label="P. Vendedora Responsável"
                onChange={ handleChange }
                inputProps={ {
                  'data-testid': 'customer_checkout__select-seller',
                } }
              >
                {sellers?.map(({ id, name }) => (
                  <MenuItem key={ id } value={ id }>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={ { marginBottom: INPUT_SPACING } }>
              <TextField
                variant="outlined"
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
            <FormControl sx={ { marginBottom: INPUT_SPACING } }>
              <TextField
                variant="outlined"
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
              variant="contained"
              data-testid="customer_checkout__button-submit-order"
              disabled={ !(address && addressNumber) }
              onClick={ handleSubmit }
              size="large"
            >
              FINALIZAR PEDIDO
            </Button>
          </Grid>
        </Grid>
      )}
    </Wrapper>
  );
}

export default Checkout;
