import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    Paper,
    TableRow,
    FormControl,
    Grid,
    Typography,
    InputLabel,
    MenuItem,
    Select,
    OutlinedInput,
    Chip

} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { LoadingSpinner } from 'src/components/loadingspinner';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info'
import React, { useState } from 'react'
import { updateUser } from 'src/NetworkUtils/NetworkUtils';
import styled from '@emotion/styled';

export const UsersDetails = (props) => {

    let [workouts, setworkouts] = useState(props.allWorkouts)
    let [diets, setdiets] = useState(props.alldiets)
    let [workout, setworkout] = useState(props.userdata.Workout)
    let [diet, setdiet] = useState(props.userdata.Diets)
    let [isloading, setisloading] = useState(false)

    const theme = useTheme();

    function onSave() {
        setisloading(true)
        let data = {
            "Name": props.userdata.Name,
            "Email": props.userdata.Email,
            "Mobile": props.userdata.Mobile,
            "Gender": props.userdata.Gender,
            "Age": props.userdata.Age,
            "Goal": props.userdata.Goal,
            "Category": props.userdata.Category,
            "Height": props.userdata.Height,
            "Weight": props.userdata.Weight,
            "Verified": "Yes",
            "Diets": diet,
            "Workout": workout,
            "Favourites_Exercises": [],
            "Favourites_Recipes": [],
            "Status": props.userdata.Status,
            "IMAGE": props.userdata.IMAGE
        }
        updateUser(props.userdata._id, data).then((res) => {
            if (res.code === 200) {
                setisloading(false)
                history.back();
            }
        });

    }

    function handelworkoutchange(event) {
        const {
            target: { value },
        } = event;
        setworkout(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    function handeldietchange(event) {
        const {
            target: { value },
        } = event;
        setdiet(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

    function convertDateTime(date) {
        let dateUTC = new Date(date);
        dateUTC = dateUTC.getTime()
        let dateIST = new Date(dateUTC);
        return dateIST.toLocaleDateString() + ' ' + dateIST.toLocaleTimeString();
    }

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    let totalGroupsByID = workouts.reduce((groupsByID, group) => {
        groupsByID[group._id] = group;
        return groupsByID;
    }, []);

    let totalGroupsByDietID = diets.reduce((groupsByID, group) => {
        groupsByID[group._id] = group;

        return groupsByID;
    }, []);

    const MenuProps = {
        PaperProps: {
            style: {
                width: 150,
            },
        },
    };

    return (
        <>
            <LoadingSpinner open={isloading} />
            <Card>
                <Grid container
                    spacing={4}>
                    <Grid
                        item
                        md={12}

                        xs={12}
                        sx={{ marginTop: '5px' }}
                    >

                        <CardHeader
                            sx={{ paddingLeft: '3' }}
                            title="Assigned Workouts"
                        />
                    </Grid>
                </Grid>
                <Divider />
                <CardContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-day5">Assigned Workouts</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-multiple-day5"
                            id="demo-multiple-chip"
                            multiple
                            value={workout}
                            onChange={handelworkoutchange}
                            input={<OutlinedInput id="select-multiple-chip" label="Assigned Workouts" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => {
                                        const group = totalGroupsByID[value];
                                        return (
                                            <Chip key={group._id} label={group.TITLE == undefined ? '' : group.TITLE} />
                                        )
                                    })}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {workouts.map((name) => (
                                <MenuItem
                                    key={name._id}
                                    value={name._id}
                                    style={getStyles(name, workouts, theme)}
                                >
                                    <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                    <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* <Grid
                        container
                        spacing={4}
                    > */}
                    {/* <Grid
                            item
                            md={6}
                            xs={12}
                            sx={{ marginTop: '5px' }}
                        >
                            <form action='#'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Assign Workouts</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        value={workout}
                                        label="Workouts"
                                        onChange={handelworkoutchange}
                                    >
                                        {workouts.map((data, i) =>
                                            <MenuItem key={i} value={data.TITLE}>{data.TITLE}</MenuItem>
                                        )}

                                    </Select>
                                </FormControl>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button type='submit' sx={{ marginTop: '10px' }} onClick={onAdd}>Add</Button>
                                </Box>
                            </form>
                        </Grid> */}

                    {/* <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            {assignedworkouts.map((data, i) =>
                                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', padding: '7px 15px 7px 15px', border: 'solid', marginTop: '5px', borderRadius: '8px', borderWidth: '1px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>{data}</span>
                                    <Button>
                                        <Delete color='error' onClick={() => deleteItem(data)}>
                                        </Delete>
                                    </Button>
                                </Box>
                            )}
                        </Grid> */}
                    {/* </Grid> */}
                </CardContent>
                <Divider />
                <Box sx={{ marginTop: '5px' }}> </Box>
                <Divider />
                <Grid container
                    spacing={4}>
                    <Grid
                        item
                        md={6}
                        xs={12}
                        sx={{ marginTop: '5px' }}
                    >

                        <CardHeader
                            sx={{ paddingLeft: '3' }}
                            title="Assigned Diet"
                        />
                    </Grid>
                </Grid>
                <Divider />
                <CardContent>
                    {/* <Grid
                        container
                        spacing={4}
                    > */}

                    {/* <Grid
                            item
                            md={6}
                            xs={12}
                            sx={{ marginTop: '5px' }}
                        >
                            <form action='#'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Assign Diets</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        value={diet}
                                        label="Diets"
                                        onChange={handeldietchange}
                                    >
                                        {diets.map((data, i) =>
                                            <MenuItem key={i} value={data.TITLE}>{data.TITLE}</MenuItem>
                                        )}

                                    </Select>
                                </FormControl>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button type='submit' sx={{ marginTop: '10px' }} onClick={onDietAdd}>Add</Button>
                                </Box>
                            </form>
                        </Grid> */}

                    {/* <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            {assigneddiets.map((data, i) =>
                                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', padding: '7px 15px 7px 15px', border: 'solid', marginTop: '5px', borderRadius: '8px', borderWidth: '1px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>{data}</span>
                                    <Button><Delete color='error' onClick={() => deleteDietsItem(data)}></Delete></Button>
                                </Box>

                            )}
                        </Grid>
                    </Grid> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-day5">Assigned Workouts</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-multiple-day5"
                            id="demo-multiple-chip"
                            multiple
                            value={diet}
                            onChange={handeldietchange}
                            input={<OutlinedInput id="select-multiple-chip" label="Assigned Workouts" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => {
                                        const group = totalGroupsByDietID[value];
                                        return (
                                            <Chip key={group._id} label={group.TITLE} />
                                        )
                                    })}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {diets.map((name) => (
                                <MenuItem
                                    key={name._id}
                                    value={name._id}
                                    style={getStyles(name, workouts, theme)}
                                >
                                    <img height={20} style={{ borderRadius: '100%' }} width={20} src={name.IMAGE}></img>
                                    <span style={{ paddingLeft: '5px' }}>{name.TITLE}</span>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                        // disabled={.isSubmitting}
                        onClick={onSave}
                        variant="contained"
                    >
                        Save details
                    </Button>
                </Box>
            </Card>
            <Box sx={{ marginTop: '10px' }}></Box>
            <Card>
                <CardHeader
                    title="User Details"
                />
                <Divider />

                <Box sx={{ marginTop: '10px' }}></Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead sx={{ backgroundColor: 'info.main', }}>
                            <TableRow>
                                <TableCell style={{ color: "white" }} align="center">Name</TableCell>
                                <TableCell style={{ color: "white" }} align="center">Email</TableCell>
                                <TableCell style={{ color: "white" }} align="center">Mobile</TableCell>
                                <TableCell style={{ color: "white" }} align="center">Joining_Date</TableCell>
                                <TableCell style={{ color: "white" }} align="center">Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow
                                key={props.userdata._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>
                                    {props.userdata.Name}
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'>
                                    {props.userdata.Email}
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'>
                                    {props.userdata.Mobile}
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'>
                                    {convertDateTime(props.userdata.Joining_Date.toString()).toString()}
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'>
                                    <HtmlTooltip
                                        title={
                                            <React.Fragment>
                                                <Typography color="inherit">User info</Typography>
                                                <b>{"Gender:"}</b> {props.userdata.Gender}<br />
                                                <b>{"Age:"}</b> {props.userdata.Age}<br />
                                                <b>{"Goal:"}</b> {props.userdata.Goal}<br />
                                                <b>{"Category:"}</b> {props.userdata.Category}<br />
                                                <b>{"Height:"}</b> {props.userdata.Height}<br />
                                                <b>{"Weight:"}</b> {props.userdata.Weight}<br />
                                            </React.Fragment>
                                        }
                                    >
                                        <InfoIcon />
                                    </HtmlTooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ marginTop: '10px' }}></Box>
            </Card>
        </>
    );
};
