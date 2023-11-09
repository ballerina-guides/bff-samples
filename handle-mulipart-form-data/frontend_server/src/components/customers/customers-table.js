import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const CustomersTable = (props) => {
  const {
    items = [],
    handleClick,
    open = false
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  First Name
                </TableCell>
                <TableCell>
                  Last Name
                </TableCell>
                <TableCell>
                  Address
                </TableCell>
                <TableCell>
                  Dependents
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                return (
                  <TableRow
                    hover
                    key={customer.firstName}
                  >
                    <TableCell>
                      {customer.firstName}
                    </TableCell>
                    <TableCell>
                      {customer.lastName}
                    </TableCell>
                    <TableCell>
                      {customer.address}
                    </TableCell>
                    <TableCell>
                      {customer.dependents}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleClick(customer.customerId)}>View Agreement</Button>
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

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  handleClick: PropTypes.func,
  open: PropTypes.bool
};
