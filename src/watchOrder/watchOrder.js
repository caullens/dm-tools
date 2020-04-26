import React, {useEffect, useState} from 'react';
import {Chip, Divider, makeStyles, Paper, Typography} from '@material-ui/core';

import WatchOrderHeader from './watchOrderHeader';

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

function WatchOrder({players}) {
  const classes = useStyles();
  const [playersInWatch, setPlayersInWatch] = useState([]);

  useEffect(() => {
    const watchOrderFromStorage = storage.getItem('watchOrder');
    if (watchOrderFromStorage) {
      setPlayersInWatch(JSON.parse(watchOrderFromStorage));
    }
  }, []);

  const handleAddPlayerClick = player => {
    if (playersInWatch.find(playerInWatch => playerInWatch.name === player.name)) return;
    const updatedPlayersInWatch = [...playersInWatch];
    updatedPlayersInWatch.push(player);
    storage.setItem('watchOrder', JSON.stringify(updatedPlayersInWatch));
    setPlayersInWatch(updatedPlayersInWatch);
  };

  const handleResetClick = () => {
    setPlayersInWatch([]);
    storage.setItem('watchOrder', JSON.stringify([]));
  };

  const selectablePlayers = players
    .filter(player => !playersInWatch.find(playerInWatch => playerInWatch.name === player.name));

  return (
    <Paper className={classes.paper}>
      <WatchOrderHeader onResetClick={handleResetClick} />
      <div className={classes.listContainer}>
        {playersInWatch.map((player, index) => (
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

export default WatchOrder;
