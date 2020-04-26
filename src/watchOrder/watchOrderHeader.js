import React from 'react';
import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import {Replay} from '@material-ui/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  moonIcon: {
    fontSize: '1.75rem',
    marginRight: theme.spacing()
  },
  title: {
    marginBottom: theme.spacing()
  }
}));

function WatchOrderHeader({onResetClick}) {
  const classes = useStyles();
  return (
    <Grid className={classes.title} container justify="space-between">
      <div>
        <FontAwesomeIcon className={classes.moonIcon} icon={faMoon} />
        <Typography display="inline" variant="h4">Watch Order</Typography>
      </div>
      <Button endIcon={<Replay />} onClick={onResetClick} size="small" variant="outlined">Reset</Button>
    </Grid>
  );
}

export default WatchOrderHeader;
