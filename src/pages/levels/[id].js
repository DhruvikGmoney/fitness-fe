import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { LevelsDetails } from "src/components/editLevels/Levels-details";
import { Profile } from "src/components/profile";
import { getAllLevel, getsingleLevel } from "src/NetworkUtils/NetworkUtils";

// export const getStaticPaths = async () => {

//     var data = [];
//     await getAllLevel().then((res) => {
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
    await getsingleLevel(id).then((res) => {
        data = res.Data;
    })
    return {
        props: { level: data }
    }
}
const Level = ({ level }) => {
    var [imageurl, setimageurl] = useState('');

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
                       <Profile imageurl={imageurls} image={level.IMAGE}/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <LevelsDetails leveldata={level} image={imageurl}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

// export default Level;
Level.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Level;