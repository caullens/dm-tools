import React, {useEffect, useState} from 'react';
import {makeStyles, Paper} from '@material-ui/core';

import MemosHeader from './memosHeader';
import MemosList from './memosList';
import AddMemoForm from './addMemoForm';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing()
  }
}));

const storage = window.localStorage;

function Memos() {
  const classes = useStyles();
  const [memos, setMemos] = useState([]);

  const handleAddMemoClick = memo => {
    if (!memo) return;
    const updatedMemos = [...memos];
    updatedMemos.push(memo);
    storage.setItem('memos', JSON.stringify(updatedMemos));
    setMemos(updatedMemos);
  };

  useEffect(() => {
    const memosFromStorage = storage.getItem('memos');
    if (memosFromStorage) {
      setMemos(JSON.parse(memosFromStorage));
    }
  }, []);

  return (
    <Paper className={classes.paper}>
      <MemosHeader />
      <MemosList memos={memos} />
      <AddMemoForm onAddMemoClick={handleAddMemoClick} />
    </Paper>
  );
}

export default Memos;
