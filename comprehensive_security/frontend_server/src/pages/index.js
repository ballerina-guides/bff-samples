import { useEffect, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { OrdersTable } from 'src/components/order/orders-table';
import { getOrderUrl } from 'src/constants/Constants';
import { getAPI } from 'src/api/ApiHandler';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAPI(getOrderUrl);
      console.log("Response", response)
      if (response.status !== 200) {
        alert("Sorry, we couldn't load this content due to a security restriction. Please try refreshing the page or contact the website administrator for assistance.");
        setError(response.message);
        setLoading(false);
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
  }, []);

  useEffect(() => {

  }, [data]);

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
            <OrdersTable
              count={data.length}
              items={data}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};


export default Page;
