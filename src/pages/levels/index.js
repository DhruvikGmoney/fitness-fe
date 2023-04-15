import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { LevelListToolbar } from 'src/components/Levels/Levels-list-toolbar';
import { LevelListResults } from 'src/components/Levels/Levels-table';

const Levels = () => (
    <>
        <Head>
            <title>
                All Levels | Fitness
            </title>
        </Head>

        <LevelListResults />

    </>
);

Levels.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Levels;
