import Head from 'next/head';
import { WorkoutListResults } from '../../components/workout/allworkouts-list-results';
import { DashboardLayout } from '../../components/dashboard-layout';

const Customers = () => (
  <>
    <Head>
      <title>
        All Workouts | Fitness
      </title>
    </Head>

    <WorkoutListResults />

  </>
);
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
