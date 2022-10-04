import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import OrderDetailsListItem from './OrderDetailsListItem';

function OrderDetailsListTable({ editable, orderItems }) {
  const DISPLAY_TABLE_CELL = 'table-cell';

  return (
    <Paper>
      <Table component="table" stickyHeader>
        <TableHead>
          <TableRow sx={ { '*': { borderBottom: '1px solid gray' } } }>
            <TableCell
              variant="head"
              sx={ {
                display: { xs: 'none', md: DISPLAY_TABLE_CELL },
                width: '50px',
              } }
            >
              Item
            </TableCell>
            <TableCell variant="head" sx={ { width: '100px' } }>
              Descrição
            </TableCell>
            <TableCell
              variant="head"
              sx={ {
                width: '50px',
                display: { xs: 'none', md: DISPLAY_TABLE_CELL },
              } }
            >
              Quantidade
            </TableCell>
            <TableCell
              variant="head"
              sx={ {
                display: { xs: 'none', md: DISPLAY_TABLE_CELL },
                width: '80px',
              } }
            >
              Preço
            </TableCell>
            <TableCell
              variant="head"
              sx={ {
                display: { xs: 'none', md: DISPLAY_TABLE_CELL },
                width: '120px',
              } }
            >
              Sub-total
            </TableCell>
            {editable && (
              <TableCell
                variant="head"
                align="right"
                sx={ {
                  display: { xs: 'none', md: DISPLAY_TABLE_CELL },
                  width: '40px',
                } }
              />
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItems?.map((item, index) => (
            <OrderDetailsListItem
              key={ item.id }
              index={ index }
              { ...item }
              editable={ editable }
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

OrderDetailsListTable.defaultProps = {
  editable: false,
};

OrderDetailsListTable.propTypes = {
  editable: PropTypes.bool,
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default OrderDetailsListTable;
