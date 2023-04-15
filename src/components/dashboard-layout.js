import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import Login from 'src/pages/login';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLogin, setLogin] = useState(true)

  useEffect(
    () => {
      const islogin = localStorage.getItem('isLogin');
      console.log(islogin);
      if (islogin === null) {
        // setLogin(false);
        setLogin(true);

      } else if (islogin === false) {
        setLogin(false);
      } else {
        setLogin(true);
      }
    }, [isLogin]

  );

  if (isLogin) {
    return (
      <>
        <DashboardLayoutRoot>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            {children}
          </Box>
        </DashboardLayoutRoot>
        <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
        <DashboardSidebar
          onClose={() => setSidebarOpen(false)}
          open={isSidebarOpen}
        />
      </>
    );
  }
  return (
    <>
      <Login />
    </>
  );
};
