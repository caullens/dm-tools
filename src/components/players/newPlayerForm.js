/* eslint-disable react/jsx-no-duplicate-props */
import React, {useState} from 'react';
import {Grid, InputAdornment, makeStyles, TextField, Tooltip, Typography, Button} from '@material-ui/core';

import PlayerDetails from '../../constants/playerDetails';

const playerDetails = PlayerDetails.PlayerDetails;
const playerDetailIds = PlayerDetails.PlayerDetailIds;

const useStyles = makeStyles(theme => ({
  addButton: {
    marginLeft: theme.spacing()
  },
  formElement: {
    marginTop: theme.spacing(2)
  },
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(),
    margin: theme.spacing()
  }
}));

function NewPlayerForm({onCancel, onSubmit}) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [armorClass, setArmorClass] = useState(10);
  const [passivePerception, setPassivePerception] = useState(10);
  const [movementSpeed, setMovementSpeed] = useState(30);
  const [weight, setWeight] = useState(100);

  function setInitialState() {
    setName('');
    setArmorClass(10);
    setPassivePerception(10);
    setMovementSpeed(30);
    setWeight(100);
  }

  const handleAddClick = () => {
    setInitialState();
    onSubmit({name, armorClass, passivePerception, movementSpeed, weight});
  };

  const handleCancelClick = () => {
    setInitialState();
    onCancel();
  };

  const handleACChange = event => setArmorClass(event.target.value);
  const handleNameChange = event => setName(event.target.value);
  const handleMovementSpeedChange = event => setMovementSpeed(event.target.value);
  const handlePassivePerceptionChange = event => setPassivePerception(event.target.value);
  const handleWeightChange = event => setWeight(event.target.value);

  function getValueForPlayerDetail(playerDetailId) {
    switch (playerDetailId) {
      case playerDetailIds.Name:
        return name;
      case playerDetailIds.ArmorClass:
        return armorClass;
      case playerDetailIds.PassivePerception:
        return passivePerception;
      case playerDetailIds.MovementSpeed:
        return movementSpeed;
      case playerDetailIds.Weight:
        return weight;
      default:
        return '';
    }
  }

  function getChangeHandler(playerDetailId) {
    switch (playerDetailId) {
      case playerDetailIds.Name:
        return handleNameChange;
      case playerDetailIds.ArmorClass:
        return handleACChange;
      case playerDetailIds.PassivePerception:
        return handlePassivePerceptionChange;
      case playerDetailIds.MovementSpeed:
        return handleMovementSpeedChange;
      case playerDetailIds.Weight:
        return handleWeightChange;
      default:
        // eslint-disable-next-line no-console
        return () => { console.error(`Invalid player detail id ${playerDetailId}.`); };
    }
  }

  return (
    <div className={classes.root}>
      <Grid container justify="space-evenly" spacing={1}>
        {playerDetails.map(playerDetail => (
          <Grid item key={playerDetail.id}>
            <TextField
              autoFocus={playerDetail.id === playerDetailIds.Name}
              InputProps={{
                startAdornment: (
                  <Tooltip
                    title={(
                      <Typography variant="caption">
                        {playerDetail.label}
                      </Typography>
                    )}>
                    <InputAdornment position="start">
                      {playerDetail.icon}
                    </InputAdornment>
                  </Tooltip>
                )
              }}
              inputProps={{
                step: playerDetail.step
              }}
              onChange={event => getChangeHandler(playerDetail.id)(event)}
              type={playerDetail.type}
              value={getValueForPlayerDetail(playerDetail.id)}
              variant="outlined"
            />
          </Grid>
        ))}
      </Grid>
      <Grid container justify="flex-end">
        <Button
          className={classes.formElement}
          color="primary"
          onClick={handleCancelClick}
          variant="outlined">
          Cancel
        </Button>
        <Button
          className={`${classes.formElement} ${classes.addButton}`}
          color="primary"
          disabled={name === ''}
          onClick={handleAddClick}
          variant="contained">
          Add Player
        </Button>
      </Grid>
    </div>
  );
}

export default NewPlayerForm;
