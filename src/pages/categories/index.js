import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { CategoryListToolbar } from 'src/components/category/category-list-toolbar';
import { CategoryListResults } from 'src/components/category/category-table';

const Categories = () => (
  <>
    <Head>
      <title>
        All Categories | Fitness
      </title>
    </Head>

    <CategoryListResults />

  </>
);

Categories.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Categories;
