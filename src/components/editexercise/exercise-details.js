import * as Yup from 'yup';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,

} from '@mui/material';
import { useEffect, useState } from 'react'
import { getAllLevel, updateExercise } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { LoadingSpinner } from 'src/components/loadingspinner';
import { useTheme } from '@mui/material/styles';


export const ExcerciseDetails = (props) => {
    let [Equipments, setEquipments] = useState(props.allEquipments);
    let [Equipment, setEquipment] = useState(props.excercisedata.EQUIPMENT);
    let [bodyparts, setbodyparts] = useState(props.allbodyparts);
    let [bodypart, setbodypart] = useState(props.excercisedata.BODYPART || []);
    let [levels, setlevels] = useState([]);
    let [level, setlevel] = useState(props.excercisedata.LEVEL);
    let [isloading, setisloading] = useState(false);



    const formik = useFormik({
        initialValues: {
            title: props.excercisedata.TITLE,
            rest: props.excercisedata.REST,
            sets: props.excercisedata.SETS,
            reps: props.excercisedata.REPS,
            videourl: props.excercisedata.VIDEO_URL,
            instruction: props.excercisedata.INSTRUCTION,
            tips: props.excercisedata.TIPS,

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
    });

    let totalGroupsByEquipmentID = Equipments.reduce((groupsByID, group) => {
        groupsByID[group._id] = group;
        return groupsByID;
    }, []);

    let totalGroupsByBodypartID = bodyparts.reduce((groupsByID, group) => {
        groupsByID[group._id] = group;
        return groupsByID;
    }, []);

    const theme = useTheme();

    function handellevelschange(event) {
        setlevel(event.target.value)
    }
    function onSave() {
        if (formik.values.title !== '' && formik.values.calories !== '' && formik.values.carbs !== '' && formik.values.category !== '' && formik.values.description !== '' && formik.values.fat !== '' && formik.values.ingredients !== '' && formik.values.price !== '' && formik.values.protein !== '' && formik.values.servings !== '' && formik.values.totaltime !== '') {
            setisloading(true)
            let data = {
                TITLE: formik.values.title,
                INSTRUCTION: formik.values.instruction,
                REST: formik.values.rest,
                SETS: formik.values.sets,
                REPS: formik.values.reps,
                VIDEO_URL: formik.values.videourl,
                TIPS: formik.values.tips,
                IMAGE: props.image,
                BODYPART: bodypart,
                EQUIPMENT: Equipment,
                LEVEL: level,
            }
            updateExercise(props.excercisedata._id, data).then((res) => {
                if (res.code === 200) {
                    setisloading(false)
                    history.back();
                }
            });
        }
    }

    function init() {
        getAllLevel().then((res) => {
            setlevels(res.Data);
        })
    }


    function handelEquipmentchange(event) {
        const {
            target: { value },
        } = event;
        setEquipment(
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    function handelBodypartchange(event) {
        const {
            target: { value },
        } = event;
        setbodypart(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const MenuProps = {
        PaperProps: {
            style: {
                width: 150,
            },
        },
    };

    useEffect(() => {
        init()

    }, [])

    return (
        <form onSubmit={formik.handleSubmit}>
            <LoadingSpinner open={isloading} />
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Edit Excercise"
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
                                multiline={true}
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
                                label="Instruction"
                                name="instruction"
                                multiline={true}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.instruction}
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
                                label="Rest"
                                name="rest"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.rest}
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
                                label="Sets"
                                name="sets"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.sets}
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
                                label="Reps"
                                name="reps"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.reps}
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
                                label="Tips"
                                name="tips"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.tips}
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
                                label="Videourl"
                                name="videourl"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.videourl}
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
                                <InputLabel id="demo-multiple-Equipment">Equipment</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-multiple-Equipment"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={Equipment}
                                    onChange={handelEquipmentchange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Equipment" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => {
                                                const group = totalGroupsByEquipmentID[value];
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
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-Bodypart">Bodypart</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-multiple-Bodypart"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={bodypart}
                                    onChange={handelBodypartchange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Bodypart" />}
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
                                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={level}
                                    label="Level"
                                    onChange={handellevelschange}
                                >
                                    {levels.map((data, i) =>
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
