import * as Yup from 'yup';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,

} from '@mui/material';
import { addPost, getAllTags } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { useEffect, useState } from 'react';
import { Profile } from 'src/components/profile';
import { LoadingSpinner } from 'src/components/loadingspinner';


const PostsDetails = (props) => {
    var [imageurl, setimageurl] = useState('');
    var [isloading, setisloading] = useState(false);

    function imageurls(url) {
        setimageurl(url);
    }

    var [tag, settag] = useState('');
    var [tags, settags] = useState([]);

    const formik = useFormik({
        initialValues: {
            title: '',
            descripiton: '',


        },
        validationSchema: Yup.object({
            title: Yup
                .string()
                .email(
                    'Must be a valid title')
                .max(255)
                .required(
                    'Title is required'),
            descripiton: Yup
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
    function handelBodypartchange(event) {
        settag(event.target.value)
    }
    function onSave() {
        if (formik.values.title !== '' && formik.values.descripiton !== '' && tag !== '' && imageurl !== '') {
            setisloading(true)
            addPost(formik.values.title, formik.values.descripiton, tag, imageurl).then((res) => {
                if (res.code === 200) {
                    setisloading(false)
                    history.back();
                }
            });
        }
    }

    function init() {
        getAllTags().then((res) => {
            settags(res.Data);
        })
    }

    useEffect(() => {
        init();
    }, [])

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
                                    subheader="The information wil be added."
                                    title="Add Post"
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
                                                label="Descripiton"
                                                name="descripiton"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.descripiton}
                                                required
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Bodypart</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={tag}
                                                    label="Bodypart"
                                                    onChange={handelBodypartchange}
                                                >
                                                    {tags.map((data, i) =>
                                                        <MenuItem key={i} value={data.TITLE}>{data.TITLE}</MenuItem>
                                                    )}

                                                </Select>
                                            </FormControl>
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
PostsDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default PostsDetails;
