import React, {useState} from 'react';
import {Grid, makeStyles} from '@material-ui/core';

import InitiativeTracker from './initiativeTracker/initiativeTracker';
import MarchingOrder from './marchingOrder/marchingOrder';
import Players from './players/players';
import WatchOrder from './watchOrder/watchOrder';

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
      return updatedPlayers;
    });
  };

  return (
    <Grid container>
      <div className={classes.container}>
        <Players players={players} onAddNewPlayer={handleAddNewPlayer} />
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
