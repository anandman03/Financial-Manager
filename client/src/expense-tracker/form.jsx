import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FormComponent(props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const classes = useStyles();

  const addTransaction = () => {
    if(amount === '' || type === '' || description === '') {
        alert("Amount/Type can't be Null.");
        return;
    }

    fetch(`/app/expense-tracker/update?type=${type}&amount=${amount}&description=${description}`, { method: "PUT" })
    .then(response => response.json())
    .then(result => {
      if(result.message === "Success") {
        props.setUpdate(true);
      }
    })
    .catch(error => alert("Some Error Occured"));

    setDescription('');
    setAmount('');
    setType('');
  };

  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onAmountChange = (event) => setAmount(Number(event.target.value));
  const onTypeChange = (event) => setType(event.target.value);

  return (
    <div className="card">
      <FormControl className="item">
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input 
          id="my-input"
          type="email" 
          aria-describedby="my-helper-text" 
          value={description} 
          onChange={onDescriptionChange} 
        />
      </FormControl>
      <FormControl className="item">
        <InputLabel htmlFor="my-input">Amount</InputLabel>
        <Input 
          id="my-input" 
          aria-describedby="my-helper-text" 
          type="number" 
          value={amount} 
          onChange={onAmountChange} 
        />
      </FormControl>
      <FormControl className={classes.formControl} id="type">
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          onChange={onTypeChange}
        >
        <MenuItem value="expense">Expense</MenuItem>
        <MenuItem value="income">Income</MenuItem>
        </Select>
      </FormControl>
      <Button className="item" id="btn" variant="contained" color="primary" onClick={addTransaction}>
        Add Transaction
      </Button>
    </div>
  );
}