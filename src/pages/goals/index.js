import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { EquipmentsListToolbar } from 'src/components/Equipments/Equipments-list-toolbar';
import { EquipmentDetails } from 'src/components/editEquipments/Equipment-details';
import { EquipmentListResults } from 'src/components/Equipments/Equipments-table';
import { GoalsListToolbar } from 'src/components/Goals/Goals-list-toolbar';
import { GoalsListResults } from 'src/components/Goals/Goals-table';

const Goals = () => (
    <>
        <Head>
            <title>
                All Goals | Fitness
            </title>
        </Head>

        <GoalsListResults />

    </>
);

Goals.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Goals;
