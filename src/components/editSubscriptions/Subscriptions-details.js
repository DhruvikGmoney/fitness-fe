import * as Yup from 'yup';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,

} from '@mui/material';
import { updateSubscription } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { LoadingSpinner } from 'src/components/loadingspinner';
import { useState } from 'react';

export const SubscriptionsDetails = (props) => {


    var [isloading, setisloading] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: props.subscriptiondata.NAME,
            duration: props.subscriptiondata.DURATION,
            price: props.subscriptiondata.PRICE,
            description: props.subscriptiondata.DESCRIPTION,
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
        }
    });

    function onSave() {
        var data = {
            NAME: formik.values.name,
            PRICE: formik.values.price,
            DURATION: formik.values.duration,
            DESCRIPTION: formik.values.description,
            STATUS: 'Active',
            IMAGE: props.image
        }
        if (formik.values.name !== '' && formik.values.duration !== '' && formik.values.price !== '' && formik.values.description !== '') {
            setisloading(true)
            updateSubscription(props.subscriptiondata._id, data).then((res) => {
                if (res.code === 200) {
                    setisloading(false)
                    history.back();
                }
            });
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <LoadingSpinner open={isloading} />

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
                                multiline={true}
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
    );
};
