import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DashboardLayout } from "src/components/dashboard-layout";
import { UsersDetails } from "src/components/editusers/users-details";
import { getAllRecipe, getAllWorkouts, getUserData } from "src/NetworkUtils/NetworkUtils";


// export const getStaticPaths = async () => {

//     var data = [];
//     await getAllUsers().then((res) => {
//         data = res.Data;
//     })

//     // map data to an array of path objects with params (id)
//     const paths = data.map((data) => {
//         return {
//             params: { id: data._id }
//         }
//     })

//     return {
//         paths,
//         fallback: false
//     }
// }

export const getServerSideProps = async (context) => {
    const id = context.params.id;
    var data = [];
    var data2 = [];
    var data3 = [];
    await getUserData(id).then((res) => {
        data = res.Data;
    })
    await getAllWorkouts().then((res) => {
        data2 = res.Data;
    })
    await getAllRecipe().then((res) => {
        data3 = res.Data;
    })
    return {
        props: { userdata: data, workout: data2, recipe: data3 },
    }
}
const Tags = ({ userdata, workout, recipe }) => {
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
                        lg={12}
                        md={12}
                        xs={12}
                    >
                        <UsersDetails userdata={userdata} allWorkouts={workout} alldiets={recipe} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

// export default Tags;
Tags.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Tags;