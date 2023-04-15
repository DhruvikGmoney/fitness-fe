import * as Yup from 'yup';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    TextField,
} from '@mui/material';
import { addSubscription } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Profile } from 'src/components/profile';
import { LoadingSpinner } from 'src/components/loadingspinner';
import { DashboardLayout } from 'src/components/dashboard-layout';

const SubscriptionsDetails = (props) => {
    var [imageurl, setimageurl] = useState('');
    var [isloading, setisloading] = useState(false);

    function imageurls(url) {
        setimageurl(url);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            duration: '',
            price: '',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup
                .string()
                .email(
                    'Must be a valid title')
                .max(255)
                .required(
                    'Title is required'),
            rate: Yup
                .string()
                .email(
                    'Must be a valid title')
                .max(255)
                .required(
                    'Title is required'),

        }),
        onSubmit: () => {
            // onSave();
        }
    });

    function onSave() {
        var data = {
            NAME: formik.values.name,
            DURATION: formik.values.duration,
            PRICE: parseInt(formik.values.price),
            DESCRIPTION: formik.values.description,
            IMAGE: imageurl,
            STATUS: 'Active'
        }
        if (formik.values.name !== '' && formik.values.duration !== '' && formik.values.price !== '' && formik.values.description !== '') {
            setisloading(true);
            addSubscription(data).then((res) => {
                if (res.code === 200) {
                    setisloading(false);
                    history.back();
                }
            });
        }
    }

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 1
            }}
        >
            <LoadingSpinner open={isloading} />

            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                    >
                        <Profile imageurl={imageurls} image={''} />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <form onSubmit={formik.handleSubmit}>
                            <Card>
                                <CardHeader
                                    subheader="The information can be edited"
                                    title="Edit Subscription"
                                />
                                <Divider />
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                name="name"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.name}
                                                required
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Description"
                                                name="description"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.description}
                                                required
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Price"
                                                name="price"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.price}
                                                required
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Duration"
                                                name="duration"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.duration}
                                                required
                                                variant="outlined"
                                            />
                                        </Grid>


                                    </Grid>
                                </CardContent>
                                <Divider />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        p: 2
                                    }}
                                >
                                    <Button
                                        type='submit'
                                        color="primary"
                                        disabled={formik.isSubmitting}
                                        onClick={onSave}
                                        variant="contained"
                                    >
                                        Save details
                                    </Button>
                                </Box>
                            </Card>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
SubscriptionsDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default SubscriptionsDetails;