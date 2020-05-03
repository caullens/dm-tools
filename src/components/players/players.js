import React, {useState} from 'react';
import {Collapse, Grid, IconButton, makeStyles, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Tooltip}
  from '@material-ui/core';
import {Add} from '@material-ui/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

import NewPlayerForm from './newPlayerForm';
import PlayerDetails from '../../constants/playerDetails';
import PlayerRow from './playerRow';

const playerDetails = PlayerDetails.PlayerDetails;

const useStyles = makeStyles(theme => ({
  actionArea: {
    marginTop: theme.spacing()
  },
  addButton: {
    width: '100%'
  },
  addIcon: {
    fontSize: '2rem'
  },
  listContainer: {
    padding: theme.spacing(),
    paddingTop: 0
  },
  paper: {
    flexGrow: 1
  },
  noPlayersText: {
    fontStyle: 'italic',
    marginTop: theme.spacing()
  },
  playersIcon: {
    fontSize: '1.75rem',
    marginRight: theme.spacing(),
    color: theme.palette.primary.contrastText
  },
  list: {
    marginBottom: theme.spacing()
  },
  listMaxHeightNoForm: {
    maxHeight: '539px',
    overflowY: 'auto',
    marginBottom: theme.spacing()
  },
  tableHeaderTitle: {
    marginLeft: theme.spacing()
  },
  titleBar: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(),
    borderRadius: 4
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
      <div className={classes.titleBar}>
        <Grid container justify="space-between">
          <div>
            <FontAwesomeIcon className={classes.playersIcon} icon={faUsers} />
            <Typography color="textPrimary" display="inline" variant="h4">Players</Typography>
          </div>
          <Tooltip title={<Typography variant="caption">New Player</Typography>}>
            <IconButton onClick={() => toggleShowForm()}>
              <Add />
            </IconButton>
          </Tooltip>
        </Grid>
      </div>
      <Collapse in={showNewPlayerForm}>
        <div className={classes.actionArea}>
          <NewPlayerForm onCancel={() => setShowNewPlayerForm(false)} onSubmit={toggleShowForm} />
        </div>
      </Collapse>
      <div className={classes.listContainer}>
        {(!players || players.length === 0) && (
          <Typography align="center" className={classes.noPlayersText} variant="h5">No players</Typography>
        )}
        {players.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                {playerDetails.map(playerDetail => (
                  <TableCell key={playerDetail.id}>
                    {playerDetail.icon}
                    <Typography className={classes.tableHeaderTitle} color="textPrimary" display="inline">
                      {`${playerDetail.label} ${playerDetail.units ? `(${playerDetail.units})` : ''}`}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell align="right"><Typography color="textPrimary">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map(player => (
                <PlayerRow
                  key={player.name}
                  onRemoveClick={onRemoveClick}
                  player={player}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Paper>
  );
}

export default Players;
