import Head from 'next/head';
import { DashboardLayout } from '../../components/dashboard-layout';
import { ExcerciseListResults } from 'src/components/exercise/exercise-table';

const Excercise = () => (
    <>
        <Head>
            <title>
                All Excercise | Fitness
            </title>
        </Head>

        <ExcerciseListResults />

    </>
);

Excercise.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Excercise;
