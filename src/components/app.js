import React, {useEffect, useState} from 'react';
import {Grid, makeStyles} from '@material-ui/core';

import InitiativeTracker from './initiativeTracker/initiativeTracker';
import MarchingOrder from './marchingOrder/marchingOrder';
import Memos from './memos/memos';
import Players from './players/players';
import Sidebar from './sidebar/sidebar';
import WatchOrder from './watchOrder/watchOrder';

import TabConstants from '../constants/tabs';

const storage = window.localStorage;

const useStyles = makeStyles(theme => ({
  container: {
    width: '464px',
    margin: theme.spacing(0.5)
  },
  mainContent: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  root: {
    display: 'flex'
  }
}));

function App() {
  const classes = useStyles();

  const [players, setPlayers] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

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
    <div className={classes.root}>
      <Sidebar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      <Grid className={classes.mainContent} container>
        {selectedTab === TabConstants.TabIds.Players && (
          <Players
            players={players}
            onAddNewPlayer={handleAddNewPlayer}
            onRemoveClick={handleRemoveClick}
          />
        )}
        {selectedTab === TabConstants.TabIds.Utilities && (
          <div className={classes.container}>
            <InitiativeTracker players={players} />
          </div>
        )}
        {selectedTab === TabConstants.TabIds.Notes && (
          <div>
            <div className={classes.container}>
              <MarchingOrder players={players} />
            </div>
            <div className={classes.container} style={{marginTop: 16}}>
              <WatchOrder players={players} />
            </div>
            <div className={classes.container}>
              <Memos />
            </div>
          </div>
        )}
      </Grid>
    </div>
  );
}

export default App;
