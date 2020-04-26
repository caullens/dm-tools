import React from 'react';
import {Grid, makeStyles, Tooltip, Typography} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShieldAlt, faEye, faRunning, faWeight} from '@fortawesome/free-solid-svg-icons';

const variants = Object.freeze({
  armorClass: 'armorClass',
  passivePerception: 'passivePerception',
  movementSpeed: 'movementSpeed',
  weight: 'weight'
});

const detailsPerVariant = Object.freeze({
  armorClass: {
    label: 'Armor Class',
    icon: faShieldAlt
  },
  passivePerception: {
    label: 'Passive Perception',
    icon: faEye
  },
  movementSpeed: {
    label: 'Movement Speed',
    icon: faRunning
  },
  weight: {
    label: 'Weight',
    icon: faWeight
  }
});

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '1.25rem',
    color: theme.palette.primary.main
  },
  playerData: {
    fontWeight: theme.typography.fontWeightBold,
    minWidth: 'max-content'
  }
}));

function PlayerDetail({detail, variant}) {
  const classes = useStyles();
  const details = detailsPerVariant[variant] || detailsPerVariant.armorClass;
  return (
    <Grid item xs container justify="space-evenly" alignItems="center">
      <Tooltip title={<Typography variant="caption">{details.label}</Typography>}>
        <span>
          <FontAwesomeIcon className={classes.icon} icon={details.icon} />
        </span>
      </Tooltip>
      <Typography
        className={classes.playerData}
        variant="subtitle1">
        {detail}
      </Typography>
    </Grid>
  );
}

PlayerDetail.variants = variants;

export default PlayerDetail;
