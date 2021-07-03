import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';

// columns of the tables to be displayed.
const columns = [
  { 
    id: 'Description',
    label: 'Description',
    minWidth: 70
  },
  { 
    id: 'Amount',
    label: 'Amount',
    minWidth: 80
  },
  { 
    id: 'Date',
    label: 'Date',
    minWidth: 50
  },
  { 
    id: 'Remove',
    label: '',
    minWidth: 10
  },
];

// Material UI table settings.
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 400,
  },
});

// Material UI table component
export default function StickyHeadTable(props) {
  // props
  const { transactions, setUpdate } = props;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // for storing the data for each row.
  const rows = [];
  transactions.forEach(transaction => {
      // object to hold same id matched by columns of table.
      const container = {
        Description: transaction.description,
        Amount: transaction.amount,
        Date: transaction.date,
        Remove: transaction.ID,
        type: transaction.type,
      }
      rows.push(container)
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  function removeTransaction(event) {
    fetch(`/app/expense-tracker/delete?ID=${event.currentTarget.id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => {
      if(data.status === "error") throw new Error(data.message);
      else setUpdate(true);
    })
    .catch(error => alert("Some Error Occured"));
  };

  // for showing green and red color based on profit and loss of stock change price.
  const changeColor = (id, row) => {
    if(id === "Amount") {
        if(row.type === "expense") return {"color": "#f00606"}
        return {"color": "#11d811"}
    }
  };

  // conditional rendering for showing differeent types of data in different styles.
  const displayRowValues = (id, value) => {
    if(id === "Remove") {
      return (
        <Button className="delete-btn" id={value} onClick={removeTransaction}>
            <DeleteForeverIcon color="secondary" />
        </Button>
      );
    }
    else if(id === "Date" || id === "Description") {
        return value;
    }
    return "$" + String(value);
  };

  return (
      <div>
          <h2> History </h2>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align} style={changeColor(column.id, row)}>
                                {/* Main display logic part */}
                                {displayRowValues(column.id, value)}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 15, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            </Paper>
      </div>
  );
};