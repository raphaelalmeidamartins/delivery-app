import { InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { StatusCodes } from 'http-status-codes';
import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderDetailsList from '../components/OrderDetailsList';
import { AppContext } from '../context';
import service from '../service';

function Checkout() {
  const placeholderItems = [
    {
      id: 1,
      name: 'Placeholder1',
      quantity: 2,
      price: 15.5,
    },
    {
      id: 2,
      name: 'Placeholder2',
      quantity: 3,
      price: 25.5,
    },
  ];

  const sellers = [
    { id: 2, name: 'Fulana Pereira' },
  ];

  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    const salesValues = {
      seller: () => setSeller(value),
      address: () => setAddress(value),
      addressNumber: () => setAddressNumber(value),
    };
    salesValues[name]();
  };

  const { userData } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // implementar a lógica da API aqui
    const response = await service.post.sales(userData?.token, {
      sellerId: seller,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      products: placeholderItems.map(({ id, quantity }) => ({ id, quantity })),
    });

    const { status } = response;
    const data = await response.json();

    // Alterar o conteúdo do if/else
    if (status !== StatusCodes.CREATED) {
      console.log('Deu ruim', data.message);
    } else {
      console.log('Deu certo!');
    }
  };

  return (
    <>
      <NavBar />
      <main>
        <section>
          <Typography component="h2" variant="h2" gutterBottom>
            Finalizar pedido
          </Typography>
          <OrderDetailsList orderItems={ placeholderItems } editable />
        </section>
        <Box component="form" onSubmit={ handleSubmit }>
          <Typography component="h2" variant="h2" gutterBottom>
            Detalhes e Endereço para entrega
          </Typography>
          <FormControl>
            <InputLabel id="seller-select-label">P. Vendedora Responsável</InputLabel>
            <Select
              labelId="seller-select-label"
              id="seller-select"
              required
              name="seller"
              value={ seller }
              onChange={ handleChange }
              inputProps={ { 'data-testid': 'customer_checkout__select-seller' } }
            >
              {sellers?.map(({ id, name }) => (
                <MenuItem key={ id } value={ id }>
                  {name}
                </MenuItem>
              ))}
            </Select>
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
              inputProps={ { 'data-testid': 'customer_checkout__input-address' } }
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
            type="button"
            variant="outlined"
            data-testid="customer_checkout__button-submit-order"
            disabled={ !(seller && address && addressNumber) }
            onClick={ handleSubmit }
          >
            FINALIZAR PEDIDO
          </Button>
        </Box>
      </main>
    </>
  );
}

export default Checkout;
