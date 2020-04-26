import React, {useState} from 'react';
import {ListItem, Typography, Grid, IconButton, makeStyles, Menu, MenuItem} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';

import PlayerDetail from './playerDetail';

const useStyles = makeStyles(theme => ({
  listItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  playerName: {
    marginRight: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
    minWidth: 'max-content'
  }
}));

function PlayerListItem({player, onEditClick, onRemoveClick}) {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleMoreClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const classes = useStyles();
  return (
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
        <IconButton onClick={handleMoreClick} size="small"><MoreVert /></IconButton>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}>
          <MenuItem onClick={() => onEditClick(player)}>Edit</MenuItem>
          <MenuItem onClick={() => onRemoveClick(player)}>Remove</MenuItem>
        </Menu>
      </Grid>
    </ListItem>
  );
}

export default PlayerListItem;
