import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { CardView } from '../components/dashboard/cardView';
import { DashboardLayout } from '../components/dashboard-layout';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import { useEffect, useState } from 'react';
import { getAllUsers, getAllRecipe, getAllEquipments, getAllGoals, getAllPost, getAllBodyparts, getAllExercise, getAllLevel, getAllTags, getAllCategory } from 'src/NetworkUtils/NetworkUtils';
import { ExcerciseIcon } from 'src/whiteIcons/excercise';
import { RecipeIcon } from 'src/whiteIcons/recipe';
import { EquipmentIcon } from 'src/whiteIcons/equipments';
import { LevelIcon } from 'src/whiteIcons/levels';
import { TagIcon } from 'src/whiteIcons/tags';
import { CategoryIcon } from 'src/whiteIcons/categoryic';
import { BodypartIcon } from 'src/whiteIcons/bodypart';
import { PostIcon } from 'src/whiteIcons/post';
import { GoalIcon } from 'src/whiteIcons/goal';

const Dashboard = () => {

  var [users, setUsers] = useState(0);
  var [exercise, setexercise] = useState(0);
  var [bodypart, setbodypart] = useState(0);
  var [recipe, setrecipe] = useState(0);
  var [equipments, setequipments] = useState(0);
  var [levels, setlevels] = useState(0);
  var [tags, settags] = useState(0);
  var [categories, setcategories] = useState(0);
  var [goals, setgoals] = useState(0);
  var [posts, setposts] = useState(0);


  function init() {
    getAllUsers().then((res) => {
      if (res.code === 200) {
        setUsers(res.Data.length);
      }
    })
    getAllExercise().then((res) => {
      if (res.code === 200) {
        setexercise(res.Data.length);
      }
    })
    getAllBodyparts().then((res) => {
      if (res.code === 200) {
        setbodypart(res.Data.length);
      }
    })
    getAllRecipe().then((res) => {
      if (res.code === 200) {
        setrecipe(res.Data.length);
      }
    })
    getAllEquipments().then((res) => {
      if (res.code === 200) {
        setequipments(res.Data.length);
      }
    })
    getAllLevel().then((res) => {
      if (res.code === 200) {
        setlevels(res.Data.length);
      }
    })
    getAllTags().then((res) => {
      if (res.code === 200) {
        settags(res.Data.length);
      }
    })
    getAllCategory().then((res) => {
      if (res.code === 200) {
        setcategories(res.Data.length);
      }
    })
    getAllGoals().then((res) => {
      if (res.code === 200) {
        setgoals(res.Data.length);
      }
    })
    getAllPost().then((res) => {
      if (res.code === 200) {
        setposts(res.Data.length);
      }
    })
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard | Fitness
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Typography variant='h4' sx={{ ml: 3, mb: 2 }}>
          Dashboard
        </Typography>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <CardView title={'Total Users'} count={users} icon={<PeopleIcon />}> </CardView>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }} spacing={2}>
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <CardView
                Onclick={() => { location.href = '/exercise/addexercise' }}
                title={'Total Excercise'} buttontext={'Add Excercise'}
                count={exercise}
                icon={<Box sx={{ m: 5 }}> <ExcerciseIcon height={'30px'} width={'30px'}></ExcerciseIcon></Box>} >
              </CardView>
            </Grid>
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <CardView
                Onclick={() => { location.href = '/bodypart/addbodypart' }}
                title={'Total Bodypart'} buttontext={'Add Bodypart'}
                count={bodypart}
                icon={<Box sx={{ m: 5 }}> <BodypartIcon height={'30px'} width={'30px'}></BodypartIcon></Box>} >
              </CardView>
            </Grid>
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <CardView
                Onclick={() => { location.href = '/recipe/addrecipe' }}
                title={'Total Recipe'} buttontext={'Add Recipe'}
                count={recipe}
                icon={<Box sx={{ m: 5 }}> <RecipeIcon height={'30px'} width={'30px'}></RecipeIcon></Box>} >
              </CardView>
            </Grid>
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <CardView
                Onclick={() => { location.href = '/equipments/addequipments' }}
                title={'Total Equipments'} buttontext={'Add Equipments'}
                count={equipments}
                icon={<Box sx={{ m: 5 }}> <EquipmentIcon height={'30px'} width={'30px'}></EquipmentIcon></Box>} >
              </CardView>
            </Grid>
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <CardView
                Onclick={() => { location.href = '/categories/addcategory' }}
                title={'Total Categories'} buttontext={'Add Category'}
                count={categories}
                icon={<Box sx={{ m: 5 }}> <CategoryIcon height={'30px'} width={'30px'}></CategoryIcon></Box>} >
              </CardView>
            </Grid>
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <CardView
                Onclick={() => { location.href = '/tags/addtags' }}
                title={'Total Tags'} buttontext={'Add Tag'}
                count={tags}
                icon={<Box sx={{ m: 5 }}> <TagIcon height={'30px'} width={'30px'}></TagIcon></Box>} >
              </CardView>
            </Grid>
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <CardView
                Onclick={() => { location.href = '/levels/addlevels' }}
                title={'Total Levels'} buttontext={'Add Level'}
                count={levels}
                icon={<Box sx={{ m: 5 }}> <LevelIcon height={'30px'} width={'30px'}></LevelIcon></Box>} >
              </CardView>
            </Grid>
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <CardView
                Onclick={() => { location.href = '/goals/addgoals' }}
                title={'Total Goals'} buttontext={'Add Goal'}
                count={goals}
                icon={<Box sx={{ m: 5 }}> <GoalIcon height={'30px'} width={'30px'}></GoalIcon></Box>} >
              </CardView>
            </Grid>
            <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <CardView
                Onclick={() => { location.href = '/posts/addposts' }}
                title={'Total Posts'} buttontext={'Add Post'}
                count={posts}
                icon={<Box sx={{ m: 5 }}> <PostIcon height={'30px'} width={'30px'}></PostIcon></Box>} >
              </CardView>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}


Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
