import Head from 'next/head';
import { DashboardLayout } from '../../components/dashboard-layout';
import { UsersListResults } from 'src/components/users/users-table';

const Users = () => (
    <>
        <Head>
            <title>
                All Users | Fitness
            </title>
        </Head>
        <UsersListResults />

    </>
);

Users.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Users;
