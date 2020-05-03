import React, {useState} from 'react';
import {IconButton, makeStyles, Menu, MenuItem, TableRow, TableCell, Typography} from '@material-ui/core';
import {ExpandMore, MoreVert} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  expandIcon: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing(2)
  }
}));

function PlayerRow({onRemoveClick, player}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseClick = () => setAnchorEl(null);
  const handleMoreClick = event => setAnchorEl(event.currentTarget);

  return (
    <TableRow hover>
      <TableCell><Typography>{player.name}</Typography></TableCell>
      <TableCell><Typography>{player.armorClass}</Typography></TableCell>
      <TableCell><Typography>{player.passivePerception}</Typography></TableCell>
      <TableCell><Typography>{player.movementSpeed}</Typography></TableCell>
      <TableCell><Typography>{player.weight}</Typography></TableCell>
      <TableCell align="right">
        <IconButton onClick={handleMoreClick} size="small"><MoreVert /></IconButton>
        <ExpandMore className={classes.expandIcon} />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseClick}>
          <MenuItem><Typography>Edit</Typography></MenuItem>
          <MenuItem onClick={() => onRemoveClick(player)}><Typography>Remove</Typography></MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}

export default PlayerRow;
