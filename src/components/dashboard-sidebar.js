import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Users as UsersIcon } from '../icons/users';
import { Logo } from '../icons/logo';
import { NavItem } from './nav-item';
import { Bodypart } from 'src/icons/bodypart';
import { Excercise } from 'src/icons/excercise';
import { Recipe } from 'src/icons/recipe';
import { Equipment } from 'src/icons/equipment';
import { Category } from 'src/icons/category';
import { Tag } from 'src/icons/tag';
import { Level } from 'src/icons/level';
import { Goal } from 'src/icons/goal';
import { Post } from 'src/icons/post';
import { Dashboard } from 'src/icons/dashboard';
import { Workout } from 'src/icons/workout';
import { Subscription } from 'src/icons/subscription';

const items = [
  {
    href: '/',
    icon: (<Dashboard fontSize="small" />),
    title: 'Dashboards'
  },
  {
    href: '/users',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Users'
  },
  {
    href: '/allworkouts',
    icon: (<Workout fontSize="small" />),
    title: 'All Workouts'
  },
  {
    href: '/exercise',
    icon: (<Excercise fontSize="small" />),
    title: 'Exercise'
  },
  {
    href: '/bodypart',
    icon: (<Bodypart fontSize="small" />),
    title: 'Bodyparts'
  },
  {
    href: '/recipe',
    icon: (<Recipe fontSize="small" />),
    title: 'Recipe'
  },
  {
    href: '/equipments',
    icon: (<Equipment fontSize="small" />),
    title: 'Equipments'
  },
  {
    href: '/categories',
    icon: (<Category fontSize="small" />),
    title: 'Categories'
  },
  {
    href: '/tags',
    icon: (<Tag fontSize="small" />),
    title: 'Tags'
  },
  {
    href: '/levels',
    icon: (<Level fontSize="small" />),
    title: 'Levels'
  },
  {
    href: '/goals',
    icon: (<Goal fontSize="small" />),
    title: 'Goals'
  },
  {
    href: '/posts',
    icon: (<Post fontSize="small" />),
    title: 'Posts'
  },
  {
    href: '/subscription',
    icon: (<Subscription fontSize="small" />),
    title: 'Subscriptions'
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Fitness
                </Typography>

              </div>

            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >

        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
