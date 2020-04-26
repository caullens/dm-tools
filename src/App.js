import React, {useState} from 'react';
import {Grid, makeStyles} from '@material-ui/core';

import InitiativeTracker from './initiativeTracker/initiativeTracker';
import Players from './players/players';

const useStyles = makeStyles(theme => ({
  playersContainer: {
    width: '464px',
    margin: theme.spacing(1)
  },
  initiativeContainer: {
    width: '464px',
    margin: theme.spacing(1)
  }
}));

function App() {
  const classes = useStyles();

  const [players, setPlayers] = useState([]);

  const handleAddNewPlayer = newPlayer => {
    if (!newPlayer) return;
    setPlayers(existingPlayers => {
      const updatedPlayers = [...existingPlayers];
      updatedPlayers.push(newPlayer);
      return updatedPlayers;
    });
  };

  return (
    <Grid container>
      <div className={classes.playersContainer}>
        <Players players={players} onAddNewPlayer={handleAddNewPlayer} />
      </div>
      <div className={classes.initiativeContainer}>
        <InitiativeTracker players={players} />
      </div>
    </Grid>
  );
}

export default App;
