import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import OrderDetailsList from '../components/OrderDetailsList';

function Checkout() {
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

  const handleSubmit = () => {};

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
        <Box component="form" onSubmit={ handleSubmit } />
        <form>
          <Typography component="h2" variant="h2" gutterBottom>
            Detalhes e Endereço para entrega
          </Typography>
          <FormControl>
            <TextField
              variant="filled"
              label="P. Vendedora Responsável"
              required
              type="text"
              name="seller"
              value={ seller }
              onChange={ handleChange }
              inputProps={ { 'data-testid': 'customer_checkout__select-seller' } }
            />
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
              inputProps={ { 'data-testid': 'customer_checkout__input-address-number' } }
            />
          </FormControl>
          <Button
            component="button"
            type="button"
            variant="outlined"
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleSubmit }
          >
            FINALIZAR PEDIDO
          </Button>
        </form>
      </main>
    </>
  );
}

export default Checkout;
