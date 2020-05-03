import React from 'react';
import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import {Replay} from '@material-ui/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faListOl} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  orderIcon: {
    fontSize: '1.75rem',
    marginRight: theme.spacing()
  },
  title: {
    marginBottom: theme.spacing()
  }
}));

function MarchingOrderHeader({onResetClick}) {
  const classes = useStyles();
  return (
    <Grid className={classes.title} container justify="space-between">
      <div>
        <FontAwesomeIcon className={classes.orderIcon} icon={faListOl} />
        <Typography display="inline" variant="h4">Marching Order</Typography>
      </div>
      <Button endIcon={<Replay />} onClick={onResetClick} size="small" variant="outlined">Reset</Button>
    </Grid>
  );
}

export default MarchingOrderHeader;
