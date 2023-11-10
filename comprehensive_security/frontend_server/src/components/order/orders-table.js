import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const OrdersTable = (props) => {
  const {
    items = []
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Ship
                </TableCell>
                <TableCell>
                  Item
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => {
                return (
                  <TableRow
                    hover
                    key={order.orderId}
                  >
                    <TableCell>
                      {order.orderId}
                    </TableCell>
                    <TableCell>
                      {order.status}
                    </TableCell>
                    <TableCell>
                      {order.shipId != null ? order.shipId : "Not Assigned"}
                    </TableCell>
                    <TableCell>
                      {order.item}
                    </TableCell>
                    <TableCell>
                      {order.quantity}
                    </TableCell>
                    <TableCell>
                      {order.date}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

OrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  handleClick: PropTypes.func,
  open: PropTypes.bool
};
