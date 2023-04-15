import * as Yup from 'yup';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,

} from '@mui/material';
import { getAllTags, updateEquipment, updatePost, updateTags } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../loadingspinner';

export const PostsDetails = (props) => {

    var [isloading, setisloading] = useState(false);
    const formik = useFormik({
        initialValues: {
            title: props.postdata.TITLE,
            description: props.postdata.DESCRIPTION,
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
    var [tag, settag] = useState(props.postdata.TAG);
    var [tags, settags] = useState([]);

    function onSave() {

        if (formik.values.title !== '') {
            setisloading(true)
            updatePost(props.postdata._id, formik.values.title, formik.values.description, tag, props.image).then((res) => {
                if (res.code === 200) {
                    setisloading(false)
                    history.back();
                }
            });
        }
    }
    function handelBodypartchange(event) {
        settag(event.target.value)
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
        <form onSubmit={formik.handleSubmit}>
            <LoadingSpinner open={isloading} />
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Edit Post"
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
                                value={formik.values.description}
                                multiline={true}
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
    );
};
