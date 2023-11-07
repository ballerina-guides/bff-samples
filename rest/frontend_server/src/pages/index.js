import { useEffect, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { OrdersTable } from 'src/sections/order/orders-table';
import { OrdersSearch } from 'src/sections/order/orders-search';
import OrderSelect from 'src/sections/order/orders-dropdown';
import { getCustomerOrderUrl, getOrderUrl } from 'src/constants/Constants';
import { getAPI } from 'src/api/ApiHandler';
import SimpleDialog from 'src/sections/order/view-order';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("");
  const [filter, setFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [order, setOrder] = useState('');

  const fetchOrderData = async (orderId) => {
    try {
      const response = await getAPI(getOrderUrl + "/" + orderId);
      if (response.status !== 200) {
        setError(response.message);
      } else {
        setError(null);
        setOrder(response.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleClickOpen = async (id) => {
    setId(id);
    await fetchOrderData(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAPI(customer != '' && status != '' ? getCustomerOrderUrl(customer) + "?status=" + status: getOrderUrl);
      if (response.status !== 200) {
        setError(response.message);
      } else {
        setError(null);
        const d = await response.data;
        setData(d);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
};

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {

  }, [data]);


  const onSearchButtonClick = (e) => {
    e.preventDefault();
    setFilter(!filter);
  }
  
  const onSearchChange = (e) => {
    setCustomer(e.target.value);
  }

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  }

  return (
    loading ? <div>Loading...</div> : error != null ? <div>{error}</div> :
    <>
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
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  href='/create-order'
                >
                  Add
                </Button>
              </div>
            </Stack>
            <Stack
              direction="row"
              alignContent={'center'}
              >
            <OrdersSearch 
              onChange={onSearchChange} 
              customer={customer}
            />
            <OrderSelect
              handleChange={onStatusChange}
              status={status}
            />
            <Button label="Search" value="Search" onClick={onSearchButtonClick}> Search </Button>
            </Stack>
            <OrdersTable
              count={data.length}
              items={data}
              handleClick={handleClickOpen}
              open={open}
            />
          </Stack>
        </Container>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          id={id}
          order={order}
      />
      </Box>
    </>
  );
};


export default Page;
