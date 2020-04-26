import React, {useState} from 'react';
import {Button, makeStyles, Paper, Typography, List} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

import NewPlayerForm from './newPlayerForm';
import PlayerListItem from './playerListItem';

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
  paper: {
    padding: theme.spacing()
  },
  noPlayersText: {
    fontStyle: 'italic'
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

function Players({players, onAddNewPlayer, onRemoveClick}) {
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
            <PlayerListItem
              key={player.name}
              player={player}
              onEditClick={() => null}
              onRemoveClick={onRemoveClick}
            />
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
