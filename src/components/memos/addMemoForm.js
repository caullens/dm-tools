import React, {useState} from 'react';
import {Button, makeStyles, TextField} from '@material-ui/core';
import {Add} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  addButton: {
    marginTop: theme.spacing()
  }
}));

function AddMemoForm({onAddMemoClick}) {
  const classes = useStyles();
  const [memo, setMemo] = useState('');

  const handleAddMemoClick = () => {
    onAddMemoClick(memo);
    setMemo('');
  };

  return (
    <>
      <TextField
        fullWidth
        multiline
        onChange={event => setMemo(event.target.value)}
        rows={4}
        value={memo}
        variant="outlined"
      />
      <Button
        className={classes.addButton}
        color="primary"
        disabled={memo === ''}
        fullWidth
        onClick={handleAddMemoClick}
        startIcon={<Add />}
        variant="outlined">
        Add Memo
      </Button>
    </>
  );
}

export default AddMemoForm;
