import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowRightIcon from '@mui/icons-material/ArrowForward';

import PropTypes from 'prop-types';

export const CardView = (props) => (
  <Card>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {props.title}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.count}
          </Typography>
        </Grid>
        <Grid item>
          <motion.div
            whileHover={{ scale: 1.2 }}
          >
            <Avatar
              key={props.id}
              sx={{
                backgroundColor: 'info.main',
                height: 56,
                width: 56
              }}
            >
              {props.icon}
            </Avatar>
          </motion.div>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        {!!props.buttontext && 
        <Button
          className='buttonnext'
          onClick={props.Onclick}
          variant='contained'>
          <span>{props.buttontext}</span>
        </Button>}
      </Box>
    </CardContent>
  </Card>
);

CardView.prototype = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
  buttontext: PropTypes.string,
  Onclick: PropTypes.func
}

