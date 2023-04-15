import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { RecipeDetails } from "src/components/editrecipe/recipe-details";
import { Profile } from "src/components/profile";
import { getAllRecipe, getsingleRecipe } from "src/NetworkUtils/NetworkUtils";

// export const getStaticPaths = async () => {

//     var data = [];
//     await getAllRecipe().then((res) => {
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
    await getsingleRecipe(id).then((res) => {
        data = res.Data;
    })
    return {
        props: { recipe: data }
    }
}

const Recipe = ({ recipe }) => {
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
                        <Profile imageurl={imageurls} image={recipe.IMAGE} />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <RecipeDetails recipedata={recipe} image={imageurl} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

// export default Recipe;
Recipe.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Recipe;