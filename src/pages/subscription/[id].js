import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import { SubscriptionsDetails } from "src/components/editSubscriptions/Subscriptions-details";
import { Profile } from "src/components/profile";
import { getAllSubscription, getsingleSubscription } from "src/NetworkUtils/NetworkUtils";

// export const getStaticPaths = async () => {

//     var data = [];
//     await getAllSubscription().then((res) => {
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
    await getsingleSubscription(id).then((res) => {
        data = res.Data;
    })
    return {
        props: { Subscription: data }
    }
}

const Recipe = ({ Subscription }) => {
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
                        <Profile imageurl={imageurls} image={Subscription.IMAGE} />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <SubscriptionsDetails subscriptiondata={Subscription} image={imageurl} />
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