import Head from 'next/head';
import { BodypartListResults } from 'src/components/bodyparts/bodyparts-table';
import { DashboardLayout } from 'src/components/dashboard-layout';

const Bodypart = () => (
  <>
    <Head>
      <title>
        All Workouts | Fitness
      </title>
    </Head>

    <BodypartListResults />

  </>
);

Bodypart.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Bodypart;
