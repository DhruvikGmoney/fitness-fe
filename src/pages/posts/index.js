import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { PostsListResults } from 'src/components/posts/posts-table';
import { PostsListToolbar } from 'src/components/posts/posts-list-toolbar';

const Posts = () => (
    <>
        <Head>
            <title>
                All Posts | Fitness
            </title>
        </Head>

        <PostsListResults />

    </>
);

Posts.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Posts;
