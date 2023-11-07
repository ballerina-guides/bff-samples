import Head from 'next/head';
import * as React from 'react';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import OrdersTable from 'src/sections/order/orders-table';

const Page = () => {

  const data = [
    { orderId: "HM-278", quantity: 5, item: "TV", customerId: "C-124", shipId: "S-8", date: "22-11-2023", status: "PENDING" },
    { orderId: "HM-340", quantity: 3, item: "IPhone 14", customerId: "C-73", shipId: "S-32", date: "12-11-2023", status: "DELIVERED" }
  ];

  return (
      <div>
        <Head>
          <title>
            orders | MegaPort Kit
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">
                    Orders
                  </Typography>
                </Stack>
              </Stack>
              <OrdersTable
                count={data.length}
                items={data}
              />
            </Stack>
          </Container>
        </Box>
      </div>
  );
};


export default Page;
