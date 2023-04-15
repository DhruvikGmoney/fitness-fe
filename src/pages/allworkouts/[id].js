import { Box, Container, Grid } from "@mui/material";
import { useState } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { AccountProfileDetails } from "src/components/Editworkout/workout-details";
import { Profile } from "src/components/profile";
import { getSingleWorkout, getAllExercise, getAllBodyparts, getAllEquipments } from "src/NetworkUtils/NetworkUtils";



export const getServerSideProps = async (context) => {
    const id = context.params.id;
    let data = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    await getSingleWorkout(id).then((res) => {
        data = res.Data;
    })
    await getAllExercise().then((res) => {
        data2 = res.Data;
    })
    await getAllBodyparts().then((res) => {
        data3 = res.Data;
    })
    await getAllEquipments().then((res) => {
        data4 = res.Data;
    })

    return {
        props: { workout: data, exercise: data2, bodyparts: data3, equipments: data4 }
    }
}

const Workout = ({ workout, exercise, bodyparts, equipments }) => {
    let [imageurl, setimageurl] = useState('');

    function imageurls(url) {
        setimageurl(url);
    }
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
                        <Profile imageurl={imageurls} image={workout.IMAGE} />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <AccountProfileDetails workoutdata={workout} allexercise={exercise} allbodyparts={bodyparts} allequipments={equipments} image={imageurl} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
// export default Workout;
Workout.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Workout;
