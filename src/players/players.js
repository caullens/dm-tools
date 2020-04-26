import React, {useState} from 'react';
import {Button, makeStyles, Paper, Typography, List, ListItem, Grid} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

import NewPlayerForm from './newPlayerForm';
import PlayerDetail from './playerDetail';

const useStyles = makeStyles(theme => ({
  addButton: {
    width: '100%'
  },
  addIcon: {
    fontSize: '2rem'
  },
  listContainer: {
    marginTop: theme.spacing()
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  paper: {
    padding: theme.spacing()
  },
  noPlayersText: {
    fontStyle: 'italic'
  },
  playerName: {
    marginRight: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
    minWidth: 'max-content'
  },
  playersIcon: {
    fontSize: '1.75rem',
    marginRight: theme.spacing()
  },
  list: {
    maxHeight: '395px',
    overflowY: 'auto',
    marginBottom: theme.spacing()
  },
  listMaxHeightNoForm: {
    maxHeight: '539px',
    overflowY: 'auto',
    marginBottom: theme.spacing()
  }
}));

function Players({players, onAddNewPlayer}) {
  const classes = useStyles();
  const [showNewPlayerForm, setShowNewPlayerForm] = useState(false);

  const toggleShowForm = newPlayer => {
    if (newPlayer) {
      setShowNewPlayerForm(false);
      onAddNewPlayer(newPlayer);
    } else {
      setShowNewPlayerForm(true);
    }
  };

  return (
    <Paper className={classes.paper}>
      <FontAwesomeIcon className={classes.playersIcon} icon={faUsers} />
      <Typography display="inline" variant="h4">Players</Typography>
      <div className={classes.listContainer}>
        <List className={showNewPlayerForm ? classes.list : classes.listMaxHeightNoForm}>
          {!(players && players.length)
            && <Typography align="center" color="textSecondary" className={classes.noPlayersText}>No players</Typography>}
          {players && players.length > 0 && players.map(player => (
            <ListItem className={classes.listItem} key={player.name} divider>
              <Typography
                className={classes.playerName}
                variant="h6">
                {player.name}
              </Typography>
              <Grid container justify="space-between">
                <PlayerDetail detail={player.armorClass} variant={PlayerDetail.variants.armorClass} />
                <PlayerDetail detail={player.passivePerception} variant={PlayerDetail.variants.passivePerception} />
                <PlayerDetail detail={player.movementSpeed} variant={PlayerDetail.variants.movementSpeed} />
                <PlayerDetail detail={player.weight} variant={PlayerDetail.variants.weight} />
              </Grid>
            </ListItem>
          ))}
        </List>
        {showNewPlayerForm
          ? <NewPlayerForm onSubmit={toggleShowForm} />
          : (
            <Button
              color="primary"
              startIcon={<Add />}
              fullWidth
              onClick={() => toggleShowForm()}
              variant="outlined">
              New Player
            </Button>
          )}
      </div>
    </Paper>
  );
}

export default Players;
