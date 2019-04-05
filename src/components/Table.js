import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    maxHeight: 300
  },
  table: {
    minWidth: 700,
  },
  tableCell: {
    fontSize: 11
  }
});

function SimpleTable(props) {
  const { classes, heads } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} padding='dense'>
        <TableHead>
          <TableRow>
            {props.heads.map(
                (head) => <TableCell>{head.label}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
            {props.data.map((dataRow, index) => (
                <TableRow key={dataRow.id} style={{ backgroundColor: index === props.selected ? '#ffeee8' : 'white' }}>
                    {props.heads.map((head) => (
                        <TableCell className={classes.tableCell}>
                          {
                            head.renderer ?
                              head.renderer(dataRow[head.id], dataRow) :
                              dataRow[head.id] || ''
                          }
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
      </Table>
      {props.children}
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);