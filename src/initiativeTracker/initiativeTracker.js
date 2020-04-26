import React, {useState} from 'react';
import {Chip, Divider, Grid, makeStyles, Paper, TextField, Typography, InputAdornment, Button} from '@material-ui/core';
import {Add, NavigateNext, Remove, Replay} from '@material-ui/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDungeon} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing()
  },
  initiativeIcon: {
    fontSize: '1.75rem',
    marginRight: theme.spacing()
  },
  listContainer: {
    height: '397px',
    paddingTop: theme.spacing(0.5),
    overflowY: 'auto'
  },
  selectablesArea: {
    height: '96px',
    overflowY: 'auto'
  },
  chip: {
    margin: theme.spacing()
  },
  addIcon: {
    cursor: 'pointer'
  },
  title: {
    marginBottom: theme.spacing()
  },
  actions: {
    marginTop: theme.spacing()
  },
  selectedCharacter: {
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px'
  },
  deadCharacter: {
    textDecoration: 'line-through',
    color: theme.palette.text.secondary
  },
  roundCount: {
    alignSelf: 'center'
  }
}));

function InitiativeTracker({players}) {
  const classes = useStyles();

  const [addNPCValue, setAddNPCValue] = useState('');
  const [charactersInInitiative, setCharactersInInitiative] = useState([]);
  const [selectableNPCs, setSelectableNPCs] = useState([]);
  const [characterTurnIndex, setCharacterTurnIndex] = useState(0);
  const [roundCount, setRoundCount] = useState(1);

  const incrementTurnIndex = () => {
    setCharacterTurnIndex(previousTurnIndex => {
      let nextTurnIndex = previousTurnIndex + 1;
      if (nextTurnIndex >= charactersInInitiative.length) {
        nextTurnIndex = 0;
        setRoundCount(prevRoundCount => prevRoundCount + 1);
      }
      setCharacterTurnIndex(nextTurnIndex);
    });
  };

  const handleAddNPCChange = event => setAddNPCValue(event.target.value);
  const handleAddNPCClick = () => {
    if (addNPCValue === '') return;
    const updatedCharactersInInitiative = [...charactersInInitiative];
    const characterIndex = updatedCharactersInInitiative.filter(character => character.name === addNPCValue).length + 1;
    const character = {
      name: addNPCValue,
      id: characterIndex
    };
    if (!selectableNPCs.find(npc => npc === addNPCValue)) {
      const updatedSelectableNPCs = [...selectableNPCs];
      updatedSelectableNPCs.push(addNPCValue);
      setSelectableNPCs(updatedSelectableNPCs);
    }
    updatedCharactersInInitiative.push(character);
    setCharactersInInitiative(updatedCharactersInInitiative);
    setAddNPCValue('');
  };
  const handleAddExistingNPCClick = npc => {
    const updatedCharactersInInitiative = [...charactersInInitiative];
    const characterIndex = updatedCharactersInInitiative.filter(character => character.name === npc).length + 1;
    const character = {
      name: npc,
      id: characterIndex
    };
    updatedCharactersInInitiative.push(character);
    setCharactersInInitiative(updatedCharactersInInitiative);
  };
  const handleAddPlayerClick = player => {
    const updatedCharactersInInitiative = [...charactersInInitiative];
    updatedCharactersInInitiative.push(player);
    setCharactersInInitiative(updatedCharactersInInitiative);
  };
  const handleResetClick = () => {
    setAddNPCValue('');
    setCharactersInInitiative([]);
    setRoundCount(1);
    setCharacterTurnIndex(0);
  };
  const handleRemoveClick = () => {
    const updatedCharactersInInitiative = [...charactersInInitiative];
    const updatedPlayer = {...updatedCharactersInInitiative[characterTurnIndex]};
    updatedPlayer.isDead = true;
    updatedCharactersInInitiative[characterTurnIndex] = updatedPlayer;
    setCharactersInInitiative(updatedCharactersInInitiative);
    incrementTurnIndex();
  };

  function buildClassName(character, index) {
    let className = '';
    if (characterTurnIndex === index) className += classes.selectedCharacter;
    if (character.isDead) className += ` ${classes.deadCharacter}`;
    return className;
  }

  const selectablePlayers = players.filter(player => (
    !charactersInInitiative.find(character => character.name === player.name)));

  return (
    <Paper className={classes.paper}>
      <Grid className={classes.title} container justify="space-between">
        <div>
          <FontAwesomeIcon className={classes.initiativeIcon} icon={faDungeon} />
          <Typography display="inline" variant="h4">Initiative Tracker</Typography>
        </div>
        <Button endIcon={<Replay />} onClick={handleResetClick} size="small" variant="outlined">Reset</Button>
      </Grid>
      <Grid className={classes.actions} container justify="space-between">
        <Button
          color="primary"
          disabled={!charactersInInitiative.length}
          startIcon={<Remove />}
          onClick={handleRemoveClick}
          variant="outlined">
          Remove
        </Button>
        <Typography className={classes.roundCount}>{`Round ${roundCount}`}</Typography>
        <Button
          color="primary"
          disabled={!charactersInInitiative.length}
          endIcon={<NavigateNext />}
          onClick={() => incrementTurnIndex()}
          variant="outlined">
          Next
        </Button>
      </Grid>
      <div className={classes.listContainer}>
        {charactersInInitiative.map((character, index) => (
          <Typography
            align="center"
            className={buildClassName(character, index)}
            key={`${character.name} ${character.id || ''}`}
            variant="h6">
            {`${character.name} ${character.id || ''}`}
          </Typography>
        ))}
      </div>
      <Divider />
      <div className={classes.selectablesArea}>
        {selectablePlayers.map(player => (
          <Chip
            className={classes.chip}
            clickable
            color="primary"
            key={player.name}
            label={player.name}
            onClick={() => handleAddPlayerClick(player)}
            size="medium"
            variant="outlined"
          />
        ))}
        {selectableNPCs && selectableNPCs.map(npc => (
          <Chip
            className={classes.chip}
            clickable
            color="secondary"
            key={npc}
            label={npc}
            onClick={() => handleAddExistingNPCClick(npc)}
            size="medium"
            variant="outlined"
          />
        ))}
      </div>
      <TextField
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment
              className={classes.addIcon}
              onClick={handleAddNPCClick}
              position="end">
              <Add />
            </InputAdornment>
          )
        }}
        onChange={handleAddNPCChange}
        placeholder="Add NPC..."
        value={addNPCValue}
        variant="outlined"
      />
    </Paper>
  );
}

export default InitiativeTracker;
