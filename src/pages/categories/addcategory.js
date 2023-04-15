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
import { addCategory } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { LoadingSpinner } from 'src/components/loadingspinner';
import { Profile } from 'src/components/profile';
import { useState } from 'react';

const CategoryDetails = (props) => {
    let [imageurl, setimageurl] = useState('');
    let [isloading, setisloading] = useState(false);

    function imageurls(url) {
        setimageurl(url);
    }

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
        if (formik.values.title !== '' && imageurl !== '') {
            setisloading(true)
            addCategory(formik.values.title, imageurl).then((res) => {
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
                        {/* <BodypartDetails bodypartdata={bodypart} /> */}

                        <form onSubmit={formik.handleSubmit}>
                            <Card>
                                <CardHeader
                                    subheader="The information can be edited"
                                    title="Add Category"
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
CategoryDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default CategoryDetails;
