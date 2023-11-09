import Head from 'next/head';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { postAPI } from 'src/api/ApiHandler';
import { submitCustomersUrl } from 'src/constants/Constants';

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [errMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dependents: '',
  });

  const [image, setImage] = useState(null);
  const [agreementPdf, setAgreementPdf] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name == "dependents" ? parseInt(value) : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAgreementPdfChange = (e) => {
    setAgreementPdf(e.target.files[0]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("form", JSON.stringify(formData));
    formDataToSend.append("image", image);
    formDataToSend.append("agreement", agreementPdf);
    try {
      const response = await postAPI(submitCustomersUrl, formDataToSend, {
        headers: {
        }
      });
      if (response.error) {
        setError(true);
        console.log(response.error)
      } else {
        setErrorMessage("");
        setOpen(false);
        setError(null);
        router.push('/');
      }
    } catch (err) {
      console.log(err)
      setErrorMessage(err.data.response.data.message);
      setOpen(true);
    }
  }

  return (
    // error != null ? <div>Something went wrong</div> :
    <>
      <Head>
        <title>
          MegaPort Kit
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <Typography variant="h4">
            Create a new Customer
          </Typography>
          <Box
            sx={{
              py: '20px'
            }}
          />
          <div>
            <form
              onSubmit={handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  required
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  required
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                />
                <TextField
                  fullWidth
                  label="Dependents"
                  name="dependents"
                  type='number'
                  onChange={handleChange}
                  value={formData.dependents}
                  required
                />
                <Stack>
                  <Grid item xs={12}>
                    <p>Agreement</p>
                    <input
                      type="file"
                      accept=".pdf"
                      name="agreementPdf"
                      onChange={handleAgreementPdfChange}
                      required
                    />
                  </Grid>
                  <p>Profile Photo</p>
                  <Grid item xs={12}>
                    <input
                      label="Profile Photo"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                      required
                    />
                  </Grid>
                </Stack>
              </Stack>
              <p>{errMessage}</p>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
              <Box sx={{ width: "15rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Dialog onClose={handleClose} open={open} fullWidth>
                  <DialogTitle sx={{ textAlign: "center" }}>{errMessage}</DialogTitle>
                </Dialog>
              </Box>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Page;
