import React, {useEffect, useState} from 'react';
import {Chip, Divider, makeStyles, Paper, Typography} from '@material-ui/core';

import MarchingOrderHeader from './marchingOrderHeader';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing()
  },
  listContainer: {
    height: '150px',
    paddingTop: theme.spacing(0.5),
    overflowY: 'auto'
  },
  selectablesArea: {
    height: '40px',
    overflowY: 'auto',
    marginTop: theme.spacing()
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const storage = window.localStorage;

function MarchingOrder({players}) {
  const classes = useStyles();
  const [playersInMarch, setPlayersInMarch] = useState([]);

  useEffect(() => {
    const marchingOrderFromStorage = storage.getItem('marchingOrder');
    if (marchingOrderFromStorage) {
      setPlayersInMarch(JSON.parse(marchingOrderFromStorage));
    }
  }, []);

  const handleAddPlayerClick = player => {
    if (playersInMarch.find(playerInMarch => playerInMarch.name === player.name)) return;
    const updatedPlayersInMarch = [...playersInMarch];
    updatedPlayersInMarch.push(player);
    storage.setItem('marchingOrder', JSON.stringify(updatedPlayersInMarch));
    setPlayersInMarch(updatedPlayersInMarch);
  };

  const handleResetClick = () => {
    setPlayersInMarch([]);
    storage.setItem('marchingOrder', JSON.stringify([]));
  };

  const selectablePlayers = players
    .filter(player => !playersInMarch.find(playerInMarch => playerInMarch.name === player.name));

  return (
    <Paper className={classes.paper}>
      <MarchingOrderHeader onResetClick={handleResetClick} />
      <div className={classes.listContainer}>
        {playersInMarch.map((player, index) => (
          <Typography
            key={player.name}
            variant="h6">
            {`${index + 1}: ${player.name}`}
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
      </div>
    </Paper>
  );
}

export default MarchingOrder;
