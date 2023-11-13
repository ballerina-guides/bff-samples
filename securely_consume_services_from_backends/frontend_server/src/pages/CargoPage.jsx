import { useEffect, useState } from 'react';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { CargosTable } from '../sections/cargo/cargo-table';
import { getCargoUrl } from '../api/Constants';
import { getAPI } from '../api/ApiHandler';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { useAuthContext } from "@asgardeo/auth-react";
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

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
                                            href='/create-cargo'
                                        >
                                            Create Cargo
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
                            />
                        </Stack>
                    </Container>
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