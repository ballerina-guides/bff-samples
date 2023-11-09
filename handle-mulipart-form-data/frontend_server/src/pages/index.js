import { useEffect, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { CustomersTable } from 'src/components/customers/customers-table';
import { getCustomerAgreementUrl, getCustomersUrl } from 'src/constants/Constants';
import { getAPI } from 'src/api/ApiHandler';
import SimpleDialog from 'src/components/customers/view-customer';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('123');
  const [agreement, setAgreement] = useState('');

  const fetchCustomerData = async (customerId) => {
    try {
      const response = await getAPI(getCustomerAgreementUrl(customerId));
      if (response.status !== 200) {
        setError(response.message);
      } else {
        setError(null);
        setAgreement(response.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleClickOpen = async (id) => {
    setId(id);
    await fetchCustomerData(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAPI(getCustomersUrl);
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
  }, []);

  return (
    loading ? <div>Loading...</div> : error != null ? <div>{error}</div> :
    <>
      <Head>
        <title>
          Customers | MegaPort Kit
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
                  Customers
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
                  href='/create-customer'
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersTable
              count={data.length}
              items={data}
              handleClick={() => handleClickOpen(id)}
              open={open}
            />
          </Stack>
        </Container>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          id={id}
          agreement={agreement}
          sx={{padding:"5rem"}}
      />
      </Box>
    </>
  );
};


export default Page;
