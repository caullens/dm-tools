import React, {useState} from 'react';
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

function MarchingOrder({players}) {
  const classes = useStyles();
  const [playersInMarch, setPlayersInMarch] = useState([]);

  const handleAddPlayerClick = player => {
    if (playersInMarch.find(playerInMarch => playerInMarch.name === player.name)) return;
    const updatedPlayersInMarch = [...playersInMarch];
    updatedPlayersInMarch.push(player);
    setPlayersInMarch(updatedPlayersInMarch);
  };

  const selectablePlayers = players
    .filter(player => !playersInMarch.find(playerInMarch => playerInMarch.name === player.name));

  return (
    <Paper className={classes.paper}>
      <MarchingOrderHeader onResetClick={() => setPlayersInMarch([])} />
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
