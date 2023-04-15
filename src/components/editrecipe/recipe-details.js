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
import { useEffect, useState } from 'react'
import { getAllCategory, updateRecipe } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { LoadingSpinner } from 'src/components/loadingspinner';


export const RecipeDetails = (props) => {
    var [categories, setcategories] = useState([]);
    var [category, setcategory] = useState(props.recipedata.CATEGORY);
    var [isloading, setisloading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: props.recipedata.TITLE,
            description: props.recipedata.DESCRIPTION,
            price: props.recipedata.PRICE,
            calories: props.recipedata.CALORIES,
            carbs: props.recipedata.CARBS,
            ingredients: props.recipedata.INGREDIENTS,
            directions: props.recipedata.DIRECTIONS,
            protein: props.recipedata.PROTEIN,
            fat: props.recipedata.FAT,
            servings: props.recipedata.SERVINGS,
            totaltime: props.recipedata.TOTAL_TIME,
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


    function handelcategorychange(event) {
        setcategory(event.target.value)
    }

    function onSave() {

        if (formik.values.title !== '' && formik.values.calories !== '' && formik.values.carbs !== '' && formik.values.category !== '' && formik.values.description !== '' && formik.values.fat !== '' && formik.values.ingredients !== '' && formik.values.price !== '' && formik.values.protein !== '' && formik.values.servings !== '' && formik.values.totaltime !== '') {
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
                IMAGE: props.image,
                PROTEIN: formik.values.protein,
                FAT: formik.values.fat,
                SERVINGS: formik.values.servings,
                TOTAL_TIME: formik.values.totaltime,
                FEATURED: 'YES',
                STATUS: 'Active'
            }
            updateRecipe(props.recipedata._id, data).then((res) => {
                if (res.code === 200) {
                    setisloading(false)
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

    return (
        <form onSubmit={formik.handleSubmit}>
            <LoadingSpinner open={isloading} />
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
                                name="carbs"
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
                                name="protein"
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
                                label="Total time"
                                name="totaltime"
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
    );
};
