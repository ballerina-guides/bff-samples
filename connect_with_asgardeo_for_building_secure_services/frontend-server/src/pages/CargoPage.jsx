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
import { CargosTable } from '../components/cargo/cargo-table';
import { getCargoUrl } from '../api/Constants';
import { getAPI } from '../api/ApiHandler';
import SimpleDialog from '../components/cargo/view-cargo';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { useAuthContext } from "@asgardeo/auth-react";
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LogoutIcon from '@mui/icons-material/Logout';

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const [cargo, setCargo] = useState('');
    const { signOut, getAccessToken } = useAuthContext();

    const logout = () => {
        try {
            signOut();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCargoData = async (cargoId) => {
        try {
            const response = await getAPI(getCargoUrl + "/" + cargoId, {
                headers:
                {
                    "Authorization": `Bearer ${await getAccessToken()}`
                }
                });
            if (response.status !== 200) {
                setError(response.message);
            } else {
                setError(null);
                setCargo(response.data);
            }
        } catch (error) {
            setError(error);
        }
    };

    const handleClickOpen = async (id) => {
        setId(id);
        await fetchCargoData(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAPI(getCargoUrl, {
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
        console.log(data)
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
                                        Cargos
                                    </Typography>
                                </Stack>
                                <div>
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
                                                    < RemoveRedEyeIcon />
                                                </SvgIcon>
                                            )}
                                            style={{ paddingLeft: 20 }}
                                            href='/ORDERS'
                                        >
                                            View ORDERS
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
                                </div>
                            </Stack>
                            <CargosTable
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
                        cargo={cargo}
                    />
                </Box>
            </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;