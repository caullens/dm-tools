import React, {useState} from 'react';
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

function WatchOrder({players}) {
  const classes = useStyles();
  const [playersInWatch, setPlayersInWatch] = useState([]);

  const handleAddPlayerClick = player => {
    if (playersInWatch.find(playerInWatch => playerInWatch.name === player.name)) return;
    const updatedPlayersInWatch = [...playersInWatch];
    updatedPlayersInWatch.push(player);
    setPlayersInWatch(updatedPlayersInWatch);
  };

  const selectablePlayers = players
    .filter(player => !playersInWatch.find(playerInWatch => playerInWatch.name === player.name));

  return (
    <Paper className={classes.paper}>
      <WatchOrderHeader onResetClick={() => setPlayersInWatch([])} />
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
