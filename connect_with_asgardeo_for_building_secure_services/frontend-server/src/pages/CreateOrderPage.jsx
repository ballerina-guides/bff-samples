/**
 * Copyright (c) 2023, WSO2 LLC (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { postAPI } from '../api/ApiHandler';
import { submitOrderUrl } from '../api/Constants';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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

  const createID = () => {
    const min = 100; // Minimum value (inclusive)
    const max = 999; // Maximum value (inclusive)
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return "HM-" + random.toString();
  }

  const createdDate = () => {
    var today = new Date();
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }

  const formik = useFormik({
    initialValues: {
      item: '',
      quantity: '',
      customer: ''
    },
    validationSchema: Yup.object({
      item: Yup
        .string("Must be a string")
        .max(255)
        .required('Item is required'),
      quantity: Yup
        .number("Must be a integer")
        .max(255)
        .required('Quantity is required'),
      customer: Yup
        .string("Must be a string")
        .max(255)
        .required('Username is required')
    }),
    onSubmit: async ({ item, customer, quantity }, helpers) => {
      try {
        const response = await postAPI(submitOrderUrl, { date: createdDate(), item, customerId: customer, status: 'PENDING', shipId: null, orderId: createID(), quantity: parseInt(quantity) }, {
          headers: {
            requestId: "Calling the create order api /order/submit/",
            "Authorization": `Bearer ${await getAccessToken()}`
          }
        });
        if (response.error) {
          setError(true);
          console.log(response.error)
        } else {
          setError(null);
          navigate('/');
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
    // error != null ? <div>Something went wrong</div> :
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
                  < RemoveRedEyeIcon />
                </SvgIcon>
              )}
              style={{ paddingLeft: 20 }}
              href='/'
            >
              View Order
            </Button>
            <Button
              startIcon={(
                <SvgIcon fontSize="small">
                  < AddIcon />
                </SvgIcon>
              )}
              style={{ paddingLeft: 20 }}
              href='/create-cargo'
            >
              Create Cargo
            </Button>
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
              Create a new Order
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
                    label="Item Name"
                    name="item"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.item}
                  />
                  <TextField
                    error={!!(formik.touched.quantity && formik.errors.quantity)}
                    fullWidth
                    helperText={formik.touched.quantity && formik.errors.quantity}
                    label="Quantity"
                    name="quantity"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                  />
                  <TextField
                    error={!!(formik.touched.customer && formik.errors.customer)}
                    fullWidth
                    helperText={formik.touched.customer && formik.errors.customer}
                    label="Username"
                    name="customer"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.customer}
                  />
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