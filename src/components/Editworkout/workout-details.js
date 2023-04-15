import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';

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
  TextField
} from '@mui/material';
import { getAllBodyparts, getAllEquipments, getAllGoals, updateWorkout, getAllLevel } from 'src/NetworkUtils/NetworkUtils';
import { useFormik } from 'formik';
import { LoadingSpinner } from '../loadingspinner';

export const AccountProfileDetails = (props) => {
  const theme = useTheme();

  let [bodyparts, setbodyparts] = useState(props.allbodyparts || []);
  let [goals, setgoals] = useState([]);
  let [levels, setlevels] = useState([]);
  let [Exercise, setExercise] = useState(props.allexercise || []);
  let [Equipments, setEquipments] = useState(props.allequipments || []);
  let [bodypart, setbodypart] = useState(props.workoutdata.BODYPART) || [];
  let [goal, setGoal] = useState(props.workoutdata.GOAL || []);
  let [level, setlevel] = useState(props.workoutdata.LEVEL || []);
  let [Equipment, setEquipment] = useState(props.workoutdata.EQUIPMENT || []);


  const [day1, setday1] = useState(props.workoutdata.DAY_1);
  const [day2, setday2] = useState(props.workoutdata.DAY_2);
  const [day3, setday3] = useState(props.workoutdata.DAY_3);
  const [day4, setday4] = useState(props.workoutdata.DAY_4);
  const [day5, setday5] = useState(props.workoutdata.DAY_5);
  const [day6, setday6] = useState(props.workoutdata.DAY_6);
  const [day7, setday7] = useState(props.workoutdata.DAY_7);
  const [isloading, setisloading] = useState(false);

  function init() {
    getAllGoals().then((res) => {
      setgoals(res.Data);
    })
    getAllLevel().then((res) => {
      setlevels(res.Data);
    })
  }

  function handelGoalchange(event) {
    setGoal(event.target.value)
  }
  function handelLevelchange(event) {
    setlevel(event.target.value)
  }
  function handelBodypartchange(event) {
    const {
      target: { value },
    } = event;
    setbodypart(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  function handelEquipmentschange(event) {
    const {
      target: { value },
    } = event;
    setEquipment(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

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

  useEffect(() => {
    init();
  }, [])

  const formik = useFormik({
    initialValues: {
      title: props.workoutdata.TITLE,
      description: props.workoutdata.DESCRIPTION,
      duration: props.workoutdata.DURATION,
      price: props.workoutdata.PRICE,
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
    if (formik.values.title !== '' && formik.values.description !== '' && formik.values.duration !== '' && goal !== '' && level !== '' && bodypart !== '' && Equipment !== '') {
      setisloading(true)
      updateWorkout(props.workoutdata._id, formik.values.title, formik.values.description, goal, level, bodypart, Equipment, formik.values.duration, 'f',
        day1,
        day2,
        day3,
        day4,
        day5,
        day6,
        day7, props.image).then((res) => {
          if (res.code === 200) {
            setisloading(false)
            history.back();
          }
        });
    }
  }


  const handleDay1 = (event) => {
    console.log(event.target.value)
    const {
      target: { value },
    } = event;
    setday1(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDay2 = (event) => {
    console.log(event.target.value)

    const {
      target: { value },
    } = event;
    setday2(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDay3 = (event) => {
    console.log(event.target.value)

    const {
      target: { value },
    } = event;
    setday3(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDay4 = (event) => {
    console.log(event.target.value)

    const {
      target: { value },
    } = event;
    setday4(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDay5 = (event) => {
    console.log(event.target.value)

    const {
      target: { value },
    } = event;
    setday5(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDay6 = (event) => {
    console.log(event.target.value)

    const {
      target: { value },
    } = event;
    setday6(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDay7 = (event) => {
    console.log(event.target.value)

    const {
      target: { value },
    } = event;
    setday7(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const MenuProps = {
    PaperProps: {
      style: {
        width: 150,
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
    <>
      <LoadingSpinner open={isloading} />
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Edit Workout"
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
                            <Chip sx={{ paddingLeft: 1 }} key={group._id} label={group.TITLE} icon={<img height={20} style={{ borderRadius: '100%' }} width={20} src={group.IMAGE}></img>} />
                          )
                        })}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {Exercise.map((name) => (
                      <MenuItem
                        // selected={selected.indexOf(name) > -1}
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
                            <Chip sx={{ paddingLeft: 1 }} key={group._id} label={group.TITLE} icon={<img height={20} style={{ borderRadius: '100%' }} width={20} src={group.IMAGE}></img>} />
                          )
                        })}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {Exercise.map((name) => (
                      <MenuItem
                        // selected={selected.indexOf(name) > -1}
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
                            <Chip sx={{ paddingLeft: 1 }} key={group._id} label={group.TITLE} icon={<img height={20} style={{ borderRadius: '100%' }} width={20} src={group.IMAGE}></img>} />
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
                            <Chip sx={{ paddingLeft: 1 }} key={group._id} label={group.TITLE} icon={<img height={20} style={{ borderRadius: '100%' }} width={20} src={group.IMAGE}></img>} />
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
                            <Chip sx={{ paddingLeft: 1 }} key={group._id} label={group.TITLE} icon={<img height={20} style={{ borderRadius: '100%' }} width={20} src={group.IMAGE}></img>} />
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
                            <Chip sx={{ paddingLeft: 1 }} key={group._id} label={group.TITLE} icon={<img height={20} style={{ borderRadius: '100%' }} width={20} src={group.IMAGE}></img>} />
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
                            <Chip sx={{ paddingLeft: 1 }} key={group._id} label={group.TITLE} icon={<img height={20} style={{ borderRadius: '100%' }} width={20} src={group.IMAGE}></img>} />
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
                {/* <Autocomplete
                                                multiple
                                                id="tags-filled"
                                                options={[]}
                                                defaultValue={[]}
                                                freeSolo
                                                onChange={(e, value) => setday7((state) => value)}
                                                renderTags={(
                                                    value = [],
                                                    getTagProps = (arg0 = { index }) => JSX.IntrinsicAttributes
                                                ) =>
                                                    value.map((option, index) => {
                                                        return (
                                                            <Chip
                                                                key={index}
                                                                variant="outlined"
                                                                label={option}
                                                                {...getTagProps({ index })}
                                                            />
                                                        );
                                                    })
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        value={day7}
                                                        // required
                                                        label="Day 7"
                                                        placeholder="Day 7"
                                                    />
                                                )}
                                            /> */}
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
                    onChange={handelGoalchange}
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
                    onChange={handelLevelchange}
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
                            <Chip key={group._id} label={group.TITLE} icon={<img style={{ height: '20px' }} src={group.IMAGE}></img>} />
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
                    onChange={handelEquipmentschange}
                    input={<OutlinedInput id="select-multiple-chip" label="Equipments" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const group = totalGroupsByEquipmentsID[value];
                          return (
                            <Chip key={group._id} label={group.TITLE} icon={<img style={{ height: '20px' }} src={group.IMAGE}></img>} />
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
    </>
  );
};
