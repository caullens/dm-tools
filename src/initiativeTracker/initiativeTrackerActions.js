import React from 'react';
import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import {NavigateNext, Remove} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  actions: {
    marginTop: theme.spacing()
  },
  roundCount: {
    alignSelf: 'center'
  }
}));

function InitiativeTrackerActions({disabled, onNextClick, onRemoveClick, roundCount}) {
  const classes = useStyles();
  return (
    <Grid className={classes.actions} container justify="space-between">
      <Button
        color="primary"
        disabled={disabled}
        startIcon={<Remove />}
        onClick={onRemoveClick}
        variant="outlined">
        Remove
      </Button>
      <Typography className={classes.roundCount}>Round {roundCount}</Typography>
      <Button
        color="primary"
        disabled={disabled}
        endIcon={<NavigateNext />}
        onClick={onNextClick}
        variant="outlined">
        Next
      </Button>
    </Grid>
  );
}

export default InitiativeTrackerActions;
