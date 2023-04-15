import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { LevelListToolbar } from 'src/components/Levels/Levels-list-toolbar';
import { LevelListResults } from 'src/components/Levels/Levels-table';
import { PostsListResults } from 'src/components/posts/posts-table';
import { PostsListToolbar } from 'src/components/posts/posts-list-toolbar';
import { RecipeListToolbar } from 'src/components/recipe/recipe-list-toolbar';
import { RecipeListResults } from 'src/components/recipe/recipe-table';

const Recipe = () => (
    <>
        <Head>
            <title>
                All Recipe | Fitness
            </title>
        </Head>

        <RecipeListResults />

    </>
);

Recipe.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Recipe;
