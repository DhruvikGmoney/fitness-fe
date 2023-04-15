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
import { updateGoals } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { LoadingSpinner } from 'src/components/loadingspinner';
import { useState } from 'react';


export const GoalsDetails = (props) => {
  console.log("dsdddd", props)

    var [isloading, setisloading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: props.goaldata.TITLE,
            description: props.goaldata.DESCRIPTION,


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
            // console.log('taped')
            // onSave();
        }
    });

    function onSave() {

        if (formik.values.title !== '' &&  formik.values.description !== ''){
            setisloading(true)
            console.log(updateGoals)
            updateGoals(props.goaldata._id, formik.values.title, formik.values.description, props.image).then((res) => {
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
                    title="Edit Goal"
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
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="DESCRIPTION"
                                name="description"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.description}
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
