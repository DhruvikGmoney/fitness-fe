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
import { getUserData, updateUser } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Profile } from 'src/components/profile';
import { DashboardLayout } from 'src/components/dashboard-layout';

const AccountDetails = (props) => {
    var [imageurl, setimageurl] = useState('');
    var [name, setname] = useState('');
    var [email, setemail] = useState('');
    var [mobile, setmobile] = useState('');
    var [isloading, setisLoading] = useState(true);

    function imageurls(url) {
        setimageurl(url);
    }
    const [userdata, setUser] = useState({});

    const formik = useFormik({
        initialValues: {
            // name: userdata.Name,
            // email: userdata.Email,
            // mobile: userdata.Mobile,
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

        if (formik.values.name !== '' && formik.values.email !== '' && formik.values.mobile !== '')
            var data = {
                "Name": name,
                "Email": email,
                "Mobile": mobile,
                "PassWord": "",
                "Gender": userdata.Gender,
                "Age": userdata.Age,
                "Goal": userdata.Goal,
                "Category": userdata.Category,
                "Height": userdata.Height,
                "Weight": userdata.Weight,
                "Verified": "Yes",
                "Diets": userdata.Diets,
                "Workout": userdata.Workout,
                "Favourites_Exercises": userdata.Favourites_Exercises,
                "Favourites_Recipes": userdata.Favourites_Recipes,
                "Status": "Active",
                "IMAGE": imageurl,
            }
        var id = localStorage.getItem('uid');
        updateUser(id, data).then((res) => {
            if (res.code === 200) {
                history.back();
            }
        });
    }
    async function getuserdetails() {
        setisLoading(true);
        var id = localStorage.getItem('uid');
        getUserData(id).then((res) => {
            setUser(res.Data);
            setname(res.Data.Name);
            setemail(res.Data.Email);
            setmobile(res.Data.Mobile);
            setimageurl(res.Data.IMAGE)
            setisLoading(false);
        })
    }
    useEffect(async () => {
        getuserdetails()
    }, [])

    function onnamechange(e) {
        setname(e.target.value)
    }
    function onemailchange(e) {
        setname(e.target.value)
    }
    function onmobilechange(e) {
        setname(e.target.value)
    }

    return (
        <>
            {!isloading && <Box
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
                            <Profile imageurl={imageurls} image={imageurl} />
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
                                        title="Edit Profile"
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
                                                    // defaultValue={userdata.Name}
                                                    name="name"
                                                    onBlur={formik.handleBlur}
                                                    onChange={onnamechange}
                                                    value={name}
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
                                                    label="Email"
                                                    name="email"
                                                    // defaultValue={userdata.Email}
                                                    onBlur={formik.handleBlur}
                                                    onChange={onemailchange}
                                                    value={email}
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
                                                    label="Mobile"
                                                    name="mobile"
                                                    // defaultValue={userdata.Mobile}
                                                    onBlur={formik.handleBlur}
                                                    onChange={onmobilechange}
                                                    value={mobile}
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
            </Box>}
        </>
    );
};
AccountDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default AccountDetails;
