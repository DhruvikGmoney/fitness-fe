import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { ExcerciseDetails } from "src/components/editexercise/exercise-details";
import { Profile } from "src/components/profile";
import { getAllBodyparts, getAllEquipments, getAllExercise, getsingleExercise } from "src/NetworkUtils/NetworkUtils";


export const getServerSideProps = async (context) => {
    const id = context.params.id;
    let data = [];
    let data2 = [];
    let data3 = [];
    await getsingleExercise(id).then((res) => {
        data = res.Data;
    })
    await getAllBodyparts().then((res) => {
        data2 = res.Data;
    })
    await getAllEquipments().then((res) => {
        data3 = res.Data;
    })
    return {
        props: { excercise: data, bodyparts: data2, equipments: data3 }
    }
}
const Excercise = ({ excercise, bodyparts, equipments }) => {

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
                        <Profile imageurl={imageurls} image={excercise.IMAGE} />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <ExcerciseDetails excercisedata={excercise} image={imageurl} allbodyparts={bodyparts} allEquipments={equipments} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

// export default Excercise;
Excercise.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Excercise;