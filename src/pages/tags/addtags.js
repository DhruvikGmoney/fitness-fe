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
import { addTags } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { LoadingSpinner } from 'src/components/loadingspinner';
import { useState } from 'react';


const TagDetails = (props) => {
    var [isloading, setisloading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',

        },
        validationSchema: Yup.object({
            title: Yup
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
        if (formik.values.title !== '') {
            setisloading(true)
            addTags(formik.values.title).then((res) => {
                if (res.code === 200) {
                    setisloading(false)
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
                        lg={12}
                        md={12}
                        xs={12}
                    >
                        <form onSubmit={formik.handleSubmit}>
                            <Card>
                                <CardHeader
                                    subheader="The information can be edited"
                                    title="Add Equipment"
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
                                                label="Title"
                                                name="title"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.title}
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
TagDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default TagDetails;
