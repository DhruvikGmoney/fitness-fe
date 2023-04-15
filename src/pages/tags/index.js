import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { EquipmentsListToolbar } from 'src/components/Equipments/Equipments-list-toolbar';
import { EquipmentDetails } from 'src/components/editEquipments/Equipment-details';
import { EquipmentListResults } from 'src/components/Equipments/Equipments-table';
import { TagsListResults } from 'src/components/tags/tags-table';
import { TagsListToolbar } from 'src/components/tags/tags-list-toolbar';
import { PostsListResults } from 'src/components/posts/posts-table';

const Tags = () => (
    <>
        <Head>
            <title>
                All Tags | Fitness
            </title>
        </Head>

        <TagsListResults />

    </>
);

Tags.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Tags;
