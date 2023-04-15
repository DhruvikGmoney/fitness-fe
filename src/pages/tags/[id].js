import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DashboardLayout } from "src/components/dashboard-layout";
import { TagsDetails } from "src/components/edittags/tags-details";
import { getAllTags, getsingleTags } from "src/NetworkUtils/NetworkUtils";


// export const getStaticPaths = async () => {

//     var data = [];
//     await getAllTags().then((res) => {
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
    await getsingleTags(id).then((res) => {
        data = res.Data;
    })
    return {
        props: { tags: data }
    }
}
const Tags = ({ tags }) => {
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
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <TagsDetails tagsdata={tags} />
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