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
import PropTypes from "prop-types";

import React, { useEffect, useState } from 'react'
import { getAllCategory, addRecipe } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { Container } from '@mui/system';
import NumberFormat from 'react-number-format';
import { Profile } from 'src/components/profile';

const RecipeDetails = (props) => {
    var [imageurl, setimageurl] = useState('');

    function imageurls(url) {
        setimageurl(url);
    }

    var [categories, setcategories] = useState([]);
    var [category, setcategory] = useState('');
    var [isloading, setisloading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            calories: '',
            carbs: '',
            ingredients: '',
            directions: '',
            protein: '',
            fat: '',
            servings: '',
            totaltime: '',
        },
        validationSchema: Yup.object({
            title: Yup
                .string()
                .email(
                    'Must be a valid title')
                .max(255)
                .required(
                    'Title is required'),
            calories: Yup.number()

        }),
        onSubmit: () => {
            // onSave();
        }
    });


    function handelcategorychange(event) {
        setcategory(event.target.value)
    }

    function onSave() {

        if (formik.values.title !== '' && imageurl !== '' && formik.values.calories !== '' && formik.values.carbs !== '' && formik.values.category !== '' && formik.values.description !== '' && formik.values.fat !== '' && formik.values.ingredients !== '' && formik.values.price !== '' && formik.values.protein !== '' && formik.values.servings !== '' && formik.values.totaltime !== '') {

            setisloading(true)
            var data = {
                TITLE: formik.values.title,
                DESCRIPTION: formik.values.description,
                INGREDIENTS: formik.values.ingredients,
                DIRECTIONS: formik.values.directions,
                CATEGORY: category,
                PRICE: formik.values.price,
                CALORIES: formik.values.calories,
                CARBS: formik.values.carbs,
                PROTEIN: formik.values.protein,
                FAT: formik.values.fat,
                IMAGE: imageurl,
                SERVINGS: formik.values.servings,
                TOTAL_TIME: formik.values.totaltime,
                FEATURED: 'YES',
                STATUS: 'Active'
            }
            addRecipe(data).then((res) => {
                if (res.code === 200) {
                    history.back();
                }
            });
        }
    }

    useEffect(() => {
        getAllCategory().then((res) => {
            setcategories(res.Data);
        })
    }, [])

    const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
        props,
        ref
    ) {
        const { onChange, ...other } = props;

        return (
            <NumberFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value
                        }
                    });
                }}
            // isNumericString
            />
        );
    });

    NumberFormatCustom.propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 1
            }}
        >
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
                                    title="Edit Recipe"
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
                                                multiline={true}
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
                                                label="Description"
                                                name="description"
                                                multiline={true}
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
                                                label="Ingredients"
                                                name="ingredients"
                                                multiline={true}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.ingredients}
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
                                                label="Directions"
                                                name="directions"
                                                multiline={true}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.directions}
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
                                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={category}
                                                    label="Category"
                                                    onChange={handelcategorychange}
                                                >
                                                    {categories.map((data, i) =>
                                                        <MenuItem key={i} value={data.TITLE}>{data.TITLE}</MenuItem>
                                                    )}

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Calories"
                                                name="calories"
                                                type={'number'}
                                                // multiline={true}

                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.calories}
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
                                                // multiline={true}
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
                                                label="Carbs"
                                                // multiline={true}
                                                name="carbs"
                                                type='number'

                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.carbs}
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
                                                label="Protein"
                                                // multiline={true}
                                                name="protein"

                                                type='number'
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.protein}
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
                                                label="Servings"
                                                name="servings"
                                                // multiline={true}
                                                type='number'
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.servings}
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
                                                label="Fat"
                                                name="fat"
                                                // multiline={true}
                                                type='number'
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.fat}
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
                                                label="Total time"
                                                name="totaltime"
                                                type='number'
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.totaltime}
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
RecipeDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default RecipeDetails;