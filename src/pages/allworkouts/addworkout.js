import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material';
import { addWorkout, getAllBodyparts, getAllEquipments, getAllExercise, getAllGoals, getAllLevel } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { useTheme } from '@mui/material/styles';
import { Profile } from 'src/components/profile';
import { LoadingSpinner } from 'src/components/loadingspinner';

const AddWorkoutDetails = (props) => {
    let [imageurl, setimageurl] = useState('');

    function imageurls(url) {
        setimageurl(url);
    }
    const theme = useTheme();

    let [bodyparts, setbodyparts] = useState([]);
    let [goals, setgoals] = useState([]);
    let [levels, setlevels] = useState([]);
    let [Equipments, setEquipments] = useState([]);
    let [Exercise, setExercise] = useState([]);
    let [bodypart, setbodypart] = useState([]);
    let [goal, setGoal] = useState('');
    let [level, setlevel] = useState('');
    let [Equipment, setEquipment] = useState([]);
    let [error, setError] = useState(false);
    let [isloading, setIsloading] = useState(false);

    //-----------IDS------------------
    const [day1, setday1] = useState([]);
    const [day2, setday2] = useState([]);
    const [day3, setday3] = useState([]);
    const [day4, setday4] = useState([]);
    const [day5, setday5] = useState([]);
    const [day6, setday6] = useState([]);
    const [day7, setday7] = useState([]);

    function init() {
        getAllBodyparts().then((res) => {
            setbodyparts(res.Data);
        })
        getAllGoals().then((res) => {
            setgoals(res.Data);
        })
        getAllLevel().then((res) => {
            setlevels(res.Data);
        })
        getAllEquipments().then((res) => {
            setEquipments(res.Data);
        })
        getAllExercise().then((res) => {
            setExercise(res.Data);
        })
    }

    function handleGoalchange(event) {
        setGoal(event.target.value)
    }

    function handleLevelchange(event) {
        setlevel(event.target.value)
    }
    function handleBodypartchange(event) {
        const {
            target: { value },
        } = event;
        setbodypart(
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    function handleEquipmentchange(event) {
        const {
            target: { value },
        } = event;
        setEquipment(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    useEffect(() => {
        init();
    }, [])

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            duration: '',
            price: '',
        },
        validationSchema: Yup.object({
            title: Yup
                .string()
                .email(
                    'Must be a valid title')
                .max(255)
                .required(
                    'Title is required'),
            description: Yup
                .string()
                .max(255)
                .required(
                    'Description is required'),
            price: Yup
                .string()
                .max(255)
                .required(
                    'Price is required'),
            duration: Yup
                .string()
                .max(255)
                .required(
                    'Duration is required')
        }),
    });

    function onSave() {
        if (formik.values.title !== '' && imageurl !== '' && formik.values.description !== '' && formik.values.duration !== '' && formik.values.price !== '' && goal !== '' && level !== '' && bodypart !== '' && Equipment !== '') {
            setError(false);
            setIsloading(true);
            addWorkout(formik.values.title, formik.values.description, goal, level, bodypart, Equipment, formik.values.duration, formik.values.price,
                day1,
                day2,
                day3,
                day4,
                day5,
                day6,
                day7, imageurl).then((res) => {
                    if (res.code === 200) {
                        setIsloading(false);
                        history.back();
                    }
                });
        } else {
            setError(true);
        }
    }


    const handleDay1 = (event) => {
        const {
            target: { value },
        } = event;
        setday1(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDay2 = (event) => {
        const {
            target: { value },
        } = event;
        setday2(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDay3 = (event) => {
        const {
            target: { value },
        } = event;
        setday3(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDay4 = (event) => {
        const {
            target: { value },
        } = event;
        setday4(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDay5 = (event) => {
        const {
            target: { value },
        } = event;
        setday5(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDay6 = (event) => {
        const {
            target: { value },
        } = event;
        setday6(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleDay7 = (event) => {
        const {
            target: { value },
        } = event;
        setday7(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    let totalGroupsByID = Exercise.reduce((groupsByID, group) => {
        groupsByID[group._id] = group;
        return groupsByID;
    }, []);

    let totalGroupsByBodypartID = bodyparts.reduce((groupsByID, group) => {
        groupsByID[group._id] = group;
        return groupsByID;
    }, []);

    let totalGroupsByEquipmentsID = Equipments.reduce((groupsByID, group) => {
        groupsByID[group._id] = group;
        return groupsByID;
    }, []);

    const MenuProps = {
        PaperProps: {
            style: {
                width: 250,
            },
        },
    };



    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
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
                        <form onSubmit={formik.handleSubmit}>
                            <Card>
                                <CardHeader
                                    subheader="The information will be add"
                                    title="Add Workout"
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
                                                multiline={true}
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
                                                multiline={true}
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
                                                multiline={true}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-day1">Day 1</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-multiple-day1"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={day1}
                                                    onChange={handleDay1}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Day 1" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => {
                                                                const group = totalGroupsByID[value];
                                                                return (
                                                                    <Chip key={group._id} label={group.TITLE} />
                                                                )
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {Exercise.map((name) => (
                                                        <MenuItem
                                                            key={name._id}
                                                            value={name._id}
                                                            style={getStyles(name, day1, theme)}
                                                        >
                                                            <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                                            <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >

                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-day2">Day 2</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-multiple-day2"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={day2}
                                                    onChange={handleDay2}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Day 2" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => {
                                                                const group = totalGroupsByID[value];
                                                                return (
                                                                    <Chip key={group._id} label={group.TITLE} />
                                                                )
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {Exercise.map((name) => (
                                                        <MenuItem
                                                            key={name._id}
                                                            value={name._id}
                                                            style={getStyles(name, day2, theme)}
                                                        >
                                                            <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                                            <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-day3">Day 3</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-multiple-day3"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={day3}
                                                    onChange={handleDay3}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Day 3" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => {
                                                                const group = totalGroupsByID[value];
                                                                return (
                                                                    <Chip key={group._id} label={group.TITLE} />
                                                                )
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {Exercise.map((name) => (
                                                        <MenuItem
                                                            key={name._id}
                                                            value={name._id}
                                                            style={getStyles(name, day3, theme)}
                                                        >
                                                            <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                                            <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-day4">Day 4</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-multiple-day4"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={day4}
                                                    onChange={handleDay4}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Day 4" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => {
                                                                const group = totalGroupsByID[value];
                                                                return (
                                                                    <Chip key={group._id} label={group.TITLE} />
                                                                )
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {Exercise.map((name) => (
                                                        <MenuItem
                                                            key={name._id}
                                                            value={name._id}
                                                            style={getStyles(name, day4, theme)}
                                                        >
                                                            <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                                            <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-day5">Day 5</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-multiple-day5"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={day5}
                                                    onChange={handleDay5}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Day 5" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => {
                                                                const group = totalGroupsByID[value];
                                                                return (
                                                                    <Chip key={group._id} label={group.TITLE} />
                                                                )
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {Exercise.map((name) => (
                                                        <MenuItem
                                                            key={name._id}
                                                            value={name._id}
                                                            style={getStyles(name, day5, theme)}
                                                        >
                                                            <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                                            <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-day6">Day 6</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-multiple-day6"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={day6}
                                                    onChange={handleDay6}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Day 6" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => {
                                                                const group = totalGroupsByID[value];
                                                                return (
                                                                    <Chip key={group._id} label={group.TITLE} />
                                                                )
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {Exercise.map((name) => (
                                                        <MenuItem
                                                            key={name._id}
                                                            value={name._id}
                                                            style={getStyles(name, day6, theme)}
                                                        >
                                                            <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                                            <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-day2">Day 7</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-multiple-day7"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={day7}
                                                    onChange={handleDay7}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Day 7" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => {
                                                                const group = totalGroupsByID[value];
                                                                return (
                                                                    <Chip key={group._id} label={group.TITLE} />
                                                                )
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {Exercise.map((name) => (
                                                        <MenuItem
                                                            key={name._id}
                                                            value={name._id}
                                                            style={getStyles(name, day7, theme)}
                                                        >
                                                            <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                                            <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Goal</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={goal}
                                                    label="Goal"
                                                    onChange={handleGoalchange}
                                                >
                                                    {goals.map((data, i) =>
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
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={level}
                                                    label="Level"
                                                    onChange={handleLevelchange}
                                                >
                                                    {levels.map((data, i) =>
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
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-Bodyparts">Bodyparts</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-multiple-Bodyparts"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={bodypart}
                                                    onChange={handleBodypartchange}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Bodyparts" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => {
                                                                const group = totalGroupsByBodypartID[value];
                                                                return (
                                                                    <Chip key={group._id} label={group.TITLE} />
                                                                )
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {bodyparts.map((name) => (
                                                        <MenuItem
                                                            key={name._id}
                                                            value={name._id}
                                                            style={getStyles(name, bodyparts, theme)}
                                                        >
                                                            <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                                            <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-Equipments">Equipments</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-multiple-Equipments"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={Equipment}
                                                    onChange={handleEquipmentchange}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Equipments" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => {
                                                                const group = totalGroupsByEquipmentsID[value];
                                                                return (
                                                                    <Chip key={group._id} label={group.TITLE} />
                                                                )
                                                            })}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {Equipments.map((name) => (
                                                        <MenuItem
                                                            key={name._id}
                                                            value={name._id}
                                                            style={getStyles(name, Equipments, theme)}
                                                        >
                                                            <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                                            <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Divider />
                                {error && <Alert sx={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px' }} severity="error" >Please fill all fields!</Alert>}
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

AddWorkoutDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default AddWorkoutDetails;