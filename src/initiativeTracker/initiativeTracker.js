import React, {useEffect, useState} from 'react';
import {Chip, Divider, makeStyles, Paper, TextField, Typography, InputAdornment} from '@material-ui/core';
import {Add} from '@material-ui/icons';

import InitiativeTrackerActions from './initiativeTrackerActions';
import InitiativeTrackerHeader from './initiativeTrackerHeader';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing()
  },
  listContainer: {
    height: '397px',
    paddingTop: theme.spacing(0.5),
    overflowY: 'auto'
  },
  selectablesArea: {
    height: '96px',
    overflowY: 'auto',
    marginTop: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  addIcon: {
    cursor: 'pointer'
  },
  selectedCharacter: {
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px'
  },
  deadCharacter: {
    textDecoration: 'line-through',
    color: theme.palette.text.secondary
  }
}));

const storage = window.localStorage;

function InitiativeTracker({players}) {
  const classes = useStyles();

  const [addNPCValue, setAddNPCValue] = useState('');
  const [charactersInInitiative, setCharactersInInitiative] = useState([]);
  const [selectableNPCs, setSelectableNPCs] = useState([]);
  const [characterTurnIndex, setCharacterTurnIndex] = useState(0);
  const [roundCount, setRoundCount] = useState(1);

  useEffect(() => {
    const charactersInInitiativeFromStorage = storage.getItem('charactersInInitiative');
    const selectableNPCsFromStorage = storage.getItem('selectableNPCs');
    const characterTurnIndexFromStorage = storage.getItem('characterTurnIndex');
    const roundCountFromStorage = storage.getItem('roundCount');

    if (charactersInInitiativeFromStorage) setCharactersInInitiative(JSON.parse(charactersInInitiativeFromStorage));
    if (selectableNPCsFromStorage) setSelectableNPCs(JSON.parse(selectableNPCsFromStorage));
    if (characterTurnIndexFromStorage) setCharacterTurnIndex(JSON.parse(characterTurnIndexFromStorage));
    if (roundCountFromStorage) setRoundCount(JSON.parse(roundCountFromStorage));
  }, []);

  const incrementTurnIndex = () => {
    setCharacterTurnIndex(previousTurnIndex => {
      let nextTurnIndex = previousTurnIndex + 1;
      if (nextTurnIndex >= charactersInInitiative.length) {
        nextTurnIndex = 0;
        setRoundCount(prevRoundCount => {
          const newRoundCount = prevRoundCount + 1;
          storage.setItem('roundCount', JSON.stringify(newRoundCount));
          return newRoundCount;
        });
      }
      storage.setItem('characterTurnIndex', JSON.stringify(nextTurnIndex));
      setCharacterTurnIndex(nextTurnIndex);
    });
  };

  const handleAddNPCChange = event => setAddNPCValue(event.target.value);
  const handleAddNPCClick = () => {
    if (addNPCValue === '') return;
    if (!selectableNPCs.find(npc => npc === addNPCValue)) {
      const updatedSelectableNPCs = [...selectableNPCs];
      updatedSelectableNPCs.push(addNPCValue);
      storage.setItem('selectableNPCs', JSON.stringify(updatedSelectableNPCs));
      setSelectableNPCs(updatedSelectableNPCs);
    }
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
    storage.setItem('charactersInInitiative', JSON.stringify(updatedCharactersInInitiative));
    setCharactersInInitiative(updatedCharactersInInitiative);
  };
  const handleAddPlayerClick = player => {
    const updatedCharactersInInitiative = [...charactersInInitiative];
    updatedCharactersInInitiative.push(player);
    storage.setItem('charactersInInitiative', JSON.stringify(updatedCharactersInInitiative));
    setCharactersInInitiative(updatedCharactersInInitiative);
  };
  const handleResetClick = () => {
    setAddNPCValue('');
    setCharactersInInitiative([]);
    setRoundCount(1);
    setCharacterTurnIndex(0);

    storage.setItem('charactersInInitiative', JSON.stringify([]));
    storage.setItem('roundCount', JSON.stringify(1));
    storage.setItem('characterTurnIndex', JSON.stringify(0));
  };
  const handleRemoveClick = () => {
    const updatedCharactersInInitiative = [...charactersInInitiative];
    const updatedPlayer = {...updatedCharactersInInitiative[characterTurnIndex]};
    updatedPlayer.isDead = true;
    updatedCharactersInInitiative[characterTurnIndex] = updatedPlayer;
    storage.setItem('charactersInInitiative', JSON.stringify(updatedCharactersInInitiative));
    setCharactersInInitiative(updatedCharactersInInitiative);
    incrementTurnIndex();
  };
  const handleDeleteNPCClick = npc => {
    if (!npc) return;
    const updatedSelectableNPCs = [...selectableNPCs];
    const npcIndex = updatedSelectableNPCs.findIndex(selectableNPC => selectableNPC === npc);
    if (npcIndex !== -1) {
      updatedSelectableNPCs.splice(npcIndex, 1);
      storage.setItem('selectableNPCs', JSON.stringify(updatedSelectableNPCs));
      setSelectableNPCs(updatedSelectableNPCs);
    }
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
      <InitiativeTrackerHeader onResetClick={handleResetClick} />
      <InitiativeTrackerActions
        disabled={!charactersInInitiative.length}
        onNextClick={() => incrementTurnIndex()}
        onRemoveClick={handleRemoveClick}
        roundCount={roundCount}
      />
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
            onDelete={() => handleDeleteNPCClick(npc)}
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
