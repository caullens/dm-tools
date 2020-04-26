/* eslint-disable react/jsx-no-duplicate-props */
import React, {useState} from 'react';
import {Grid, InputAdornment, makeStyles, TextField, Tooltip, Typography, Button} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faRunning, faShieldAlt, faUser, faWeight} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  formElement: {
    marginTop: theme.spacing(2)
  }
}));

function NewPlayerForm({onSubmit}) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [armorClass, setArmorClass] = useState(10);
  const [passivePerception, setPassivePerception] = useState(10);
  const [movementSpeed, setMovementSpeed] = useState(30);
  const [weight, setWeight] = useState(100);

  const handleAddClick = () => {
    onSubmit({name, armorClass, passivePerception, movementSpeed, weight});
  };

  const handleACChange = event => setArmorClass(event.target.value);
  const handleNameChange = event => setName(event.target.value);
  const handleMovementSpeedChange = event => setMovementSpeed(event.target.value);
  const handlePassivePerceptionChange = event => setPassivePerception(event.target.value);
  const handleWeightChange = event => setWeight(event.target.value);

  return (
    <div>
      <TextField
        autoFocus
        fullWidth
        InputProps={{
          startAdornment: (
            <Tooltip title={<Typography variant="caption">Name</Typography>}>
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faUser} />
              </InputAdornment>
            </Tooltip>
          ),
        }}
        onChange={handleNameChange}
        value={name}
        variant="outlined"
      />
      <Grid container spacing={2}>
        <Grid item xs>
          <TextField
            className={classes.formElement}
            fullWidth
            InputProps={{
              startAdornment: (
                <Tooltip title={<Typography variant="caption">Armor Class</Typography>}>
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faShieldAlt} />
                  </InputAdornment>
                </Tooltip>
              )
            }}
            onChange={handleACChange}
            type="number"
            value={armorClass}
            variant="outlined"
          />
        </Grid>
        <Grid item xs>
          <TextField
            className={classes.formElement}
            fullWidth
            InputProps={{
              startAdornment: (
                <Tooltip title={<Typography variant="caption">Passive Perception</Typography>}>
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEye} />
                  </InputAdornment>
                </Tooltip>
              )
            }}
            onChange={handlePassivePerceptionChange}
            type="number"
            value={passivePerception}
            variant="outlined"
          />
        </Grid>
        <Grid item xs>
          <TextField
            className={classes.formElement}
            fullWidth
            InputProps={{
              startAdornment: (
                <Tooltip title={<Typography variant="caption">Movement Speed</Typography>}>
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faRunning} />
                  </InputAdornment>
                </Tooltip>
              )
            }}
            inputProps={{
              step: 5
            }}
            onChange={handleMovementSpeedChange}
            type="number"
            value={movementSpeed}
            variant="outlined"
          />
        </Grid>
        <Grid item xs>
          <TextField
            className={classes.formElement}
            fullWidth
            InputProps={{
              startAdornment: (
                <Tooltip title={<Typography variant="caption">Weight</Typography>}>
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faWeight} />
                  </InputAdornment>
                </Tooltip>
              )
            }}
            inputProps={{
              step: 5
            }}
            onChange={handleWeightChange}
            type="number"
            value={weight}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Button
        className={classes.formElement}
        color="primary"
        disabled={name === ''}
        fullWidth
        onClick={handleAddClick}
        variant="contained">
        Add Player
      </Button>
    </div>
  );
}

export default NewPlayerForm;
