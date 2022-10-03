import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import InputNumber from './InputNumber';

function ProductCard({ price, thumbnail, name, id }) {
  return (
    <Card sx={ { height: '100%', width: '100%', position: 'relative' } }>
      <CardMedia
        component="img"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        height="290"
        image={ thumbnail }
        alt="screenshot"
        sx={ {
          height: '170px',
          margin: '28px 0',
          width: '100%',
          objectFit: 'contain',
        } }
      />
      <CardContent sx={ { backgroundColor: 'lightgray' } }>
        <Typography
          gutterBottom
          align="center"
          variant="body1"
          data-testid={ `customer_products__element-card-title-${id}` }
          component="h5"
          sx={ { height: '40px', overflow: 'hidden' } }
        >
          {name}
        </Typography>
        <Chip
          data-testid={ `customer_products__element-card-price-${id}` }
          label={ `R$ ${price.toFixed(2).replace('.', ',')}` }
          sx={ {
            borderRadius: '8px',
            fontSize: '24px',
            fontWeight: '550',
            position: 'absolute',
            left: '14px',
            top: '14px',
          } }
        />
        <CardActions sx={ { display: 'flex', justifyContent: 'center' } }>
          <InputNumber product={ { price, thumbnail, name, id } } id={ id } />
        </CardActions>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ProductCard;
