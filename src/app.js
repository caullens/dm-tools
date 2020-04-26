import React, {useEffect, useState} from 'react';
import {Grid, makeStyles} from '@material-ui/core';

import InitiativeTracker from './initiativeTracker/initiativeTracker';
import MarchingOrder from './marchingOrder/marchingOrder';
import Players from './players/players';
import WatchOrder from './watchOrder/watchOrder';

const storage = window.localStorage;

const useStyles = makeStyles(theme => ({
  container: {
    width: '464px',
    margin: theme.spacing()
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
      storage.setItem('players', JSON.stringify(updatedPlayers));
      return updatedPlayers;
    });
  };

  const handleRemoveClick = player => {
    if (!player) return;
    setPlayers(existingPlayers => {
      const updatedPlayers = [...existingPlayers];
      const playerToRemoveIndex = updatedPlayers.findIndex(existingPlayer => existingPlayer.name === player.name);
      if (playerToRemoveIndex === -1) return updatedPlayers;
      updatedPlayers.splice(playerToRemoveIndex, 1);
      storage.setItem('players', JSON.stringify(updatedPlayers));
      return updatedPlayers;
    });
  };

  useEffect(() => {
    const playersFromStorage = storage.getItem('players');
    if (playersFromStorage) {
      setPlayers(JSON.parse(playersFromStorage));
    }
  }, []);

  return (
    <Grid container>
      <div className={classes.container}>
        <Players
          players={players}
          onAddNewPlayer={handleAddNewPlayer}
          onRemoveClick={handleRemoveClick}
        />
      </div>
      <div className={classes.container}>
        <InitiativeTracker players={players} />
      </div>
      <div>
        <div className={classes.container}>
          <MarchingOrder players={players} />
        </div>
        <div className={classes.container} style={{marginTop: 16}}>
          <WatchOrder players={players} />
        </div>
      </div>
    </Grid>
  );
}

export default App;
