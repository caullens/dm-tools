import React from 'react';
import {List, ListItem, ListItemText, makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    height: '450px',
    overflowY: 'auto'
  },
  noMemoText: {
    fontStyle: 'italic'
  }
});

function MemosList({memos}) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {!(memos && memos.length) && <Typography align="center" className={classes.noMemoText}>No memos</Typography>}
      {memos && memos.map(memo => (
        <ListItem divider key={memo}>
          <ListItemText>{memo}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export default MemosList;
