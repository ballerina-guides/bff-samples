import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  SvgIcon,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { postAPI } from '../api/ApiHandler';
import { submitCargoUrl } from '../api/Constants';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from "@asgardeo/auth-react";

const Page = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { signOut, getAccessToken } = useAuthContext();

  const logout = () => {
    try {
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const createCargoId = () => {
    const min = 100; // Minimum value (inclusive)
    const max = 999; // Maximum value (inclusive)
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return "S-" + random.toString();
  }

  function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }

  const formik = useFormik({
    initialValues: {
      startFrom: '',
      endFrom: '',
      type: ''
    },
    validationSchema: Yup.object({
      startFrom: Yup
        .string("Must be a string")
        .max(255)
        .required('Item is required'),
      endFrom: Yup
        .string("Must be a string")
        .max(255)
        .required('Item is required'),
      type: Yup
        .string("Must be a string")
        .max(255)
        .required('Item is required'),
    }),
    onSubmit: async ({ type, startFrom, endFrom }, helpers) => {
      try {
        const response = await postAPI(submitCargoUrl, { cargoType: type, startFrom, endFrom, cargoId: createCargoId(), status: 'DOCKED', lat: getRandomInRange().toString(), lon: getRandomInRange().toString() }, {
          headers:
          {
              "Authorization": `Bearer ${await getAccessToken()}`
          }
          });
        if (response.error) {
          setError(true);
          console.log(response.error)
        } else {
          setError(null);
          navigate('/cargos');
        }
      } catch (err) {
        console.log(err)
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    error != null ? <div>Something went wrong</div> :
      <>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            flex: '1 1 auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      < LocalShippingIcon />
                    </SvgIcon>
                  )}
                  style={{ paddingLeft: 20 }}
                  href='/cargos'
                >
                  View Cargo
                </Button>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      < LogoutIcon />
                    </SvgIcon>
                  )}
                  onClick={() => logout()}
                  style={{ paddingLeft: 20 }}
                >
                  Sign Out
                </Button>
              </div>
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: '100px',
              width: '100%'
            }}
          >
              <Typography variant="h4">
                Create a new Cargo
              </Typography>
              <Box
                sx={{
                  py: '20px'
                }}
              />
              <div>
                <form
                  onSubmit={formik.handleSubmit}
                >
                  <Stack spacing={3}>
                    <TextField
                      error={!!(formik.touched.item && formik.errors.item)}
                      fullWidth
                      helperText={formik.touched.item && formik.errors.item}
                      label="Start From"
                      name="startFrom"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.startFrom}
                    />
                    <TextField
                      error={!!(formik.touched.quantity && formik.errors.quantity)}
                      fullWidth
                      helperText={formik.touched.quantity && formik.errors.quantity}
                      label="Destination"
                      name="endFrom"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.endFrom}
                    />
                    <FormControl fullWidth margin="normal" required>
                      <InputLabel>Type</InputLabel>
                      <Select
                        error={!!(formik.touched.quantity && formik.errors.quantity)}
                        fullWidth
                        helperText={formik.touched.quantity && formik.errors.quantity}
                        label="Type"
                        name="type"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.type}
                      >
                        <MenuItem value="ShipEx">ShipEx</MenuItem>
                        <MenuItem value="CargoWave">CargoWave</MenuItem>
                        <MenuItem value="TradeLogix">TradeLogix</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  {formik.errors.submit && (
                    <Typography
                      color="error"
                      sx={{ mt: 3 }}
                      variant="body2"
                    >
                      {formik.errors.submit}
                    </Typography>
                  )}
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    onClick={() => { }}
                  >
                    Back
                  </Button>
                </form>
              </div>
          </Box>

          </Stack>
        </Box>
      </>
  );
};

export default Page;