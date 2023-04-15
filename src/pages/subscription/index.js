import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { SubscriptionListToolbar } from 'src/components/subscription/subscription-list-toolbar';
import { SubscriptionListResults } from 'src/components/subscription/subscription-table';

const Subscription = () => (
    <>
        <Head>
            <title>
                All Subscription | Fitness
            </title>
        </Head>

        <SubscriptionListResults />

    </>
);

Subscription.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Subscription;
