import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { PostsDetails } from "src/components/editposts/posts-details";
import { Profile } from "src/components/profile";
import { getAllLevel, getAllPost, getsingleLevel, getsinglePost } from "src/NetworkUtils/NetworkUtils";

// export const getStaticPaths = async () => {

//     var data = [];
//     await getAllPost().then((res) => {
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
    await getsinglePost(id).then((res) => {
        data = res.Data;
    })
    return {
        props: { post: data }
    }
}
const Post = ({ post }) => {
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
                        <Profile imageurl={imageurls} image={post.IMAGE}/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <PostsDetails postdata={post} image={imageurl}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

// export default Post;
Post.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Post;