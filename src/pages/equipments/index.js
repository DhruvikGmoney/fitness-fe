import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { EquipmentsListToolbar } from 'src/components/Equipments/Equipments-list-toolbar';
import { EquipmentDetails } from 'src/components/editEquipments/Equipment-details';
import { EquipmentListResults } from 'src/components/Equipments/Equipments-table';

const Equipments = () => (
    <>
        <Head>
            <title>
                All Equipments | Fitness
            </title>
        </Head>
    
                    <EquipmentListResults />
             
    </>
);

Equipments.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Equipments;
