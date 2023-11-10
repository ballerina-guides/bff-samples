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

import { useEffect, useState } from 'react';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { OrdersTable } from '../components/order/orders-table';
import { getOrderUrl } from '../api/Constants';
import { getAPI } from '../api/ApiHandler';
import { Layout } from '../layouts/dashboard/layout.js';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from "@asgardeo/auth-react";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const { signOut, getAccessToken } = useAuthContext();

    const logout = () => {
        try {
            signOut();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAPI(getOrderUrl, {
                headers:
                {
                    "Authorization": `Bearer ${await getAccessToken()}`
                }
                });
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
                                                < AddIcon />
                                            </SvgIcon>
                                        )}
                                        style={{ paddingLeft: 20 }}
                                        href='/create-order'
                                    >
                                        Create Order
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

Page.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
);

export default Page;