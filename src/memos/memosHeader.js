import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStickyNote} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  noteIcon: {
    fontSize: '1.75rem',
    marginRight: theme.spacing()
  },
  title: {
    marginBottom: theme.spacing()
  }
}));

function MemosHeader() {
  const classes = useStyles();
  return (
    <div>
      <FontAwesomeIcon className={classes.noteIcon} icon={faStickyNote} />
      <Typography display="inline" variant="h4">Memos</Typography>
    </div>
  );
}

export default MemosHeader;
