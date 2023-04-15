import { useEffect, useState } from 'react';
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
import { updateEquipment } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { LoadingSpinner } from 'src/components/loadingspinner';


export const EquipmentDetails = (props) => {
    var [isloading, setisloading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: props.equipmentdata.TITLE,

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
        }
    });

    function onSave() {

        if (formik.values.title !== '') {
            setisloading(true)
            updateEquipment(props.equipmentdata._id, formik.values.title, props.image).then((res) => {
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
                    title="Edit Equipment"
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
    );
};
