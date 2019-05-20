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
import LabelClipboard from './LabelClipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortDown, faSortUp, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton';
import sortBy from 'lodash/sortBy'
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

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
    fontSize: 12
  },
  htmlTooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
});

const NOT_ACTIVE_FILTER_COLOR = 'rgb(206, 206, 206)'
const ACTIVE_FILTER_COLOR = '#8c8c8c'
const DESC = 'desc'
const ASC = 'asc'
const EMPTY = '---'

class SimpleTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sortBy: props.sortBy || EMPTY,
      sortOrder: props.sortOrder || EMPTY,
      searchBy: EMPTY,
      search: ''
    }
  }

  selectSorting = (sortBy) => {
    let sortOrder = DESC
    if (this.state.sortBy === sortBy) {
      sortOrder = this.state.sortOrder === DESC ? ASC : EMPTY
      sortBy = sortOrder === EMPTY ? EMPTY : sortBy
    }

    this.setState({ sortBy, sortOrder })
  }

  getSorting = (head) => {
    let arrow = faSort
    const isActive = this.state.sortBy === head
    if (isActive) {
      if (this.state.sortOrder === DESC) {
        arrow = faSortDown
      } else if (this.state.sortOrder === ASC) {
        arrow = faSortUp
      }
    }
    const color = isActive ? ACTIVE_FILTER_COLOR : NOT_ACTIVE_FILTER_COLOR

    return (
      <IconButton
        onClick={() => this.selectSorting(head)}
        style={{ padding: 5 }}
      >
        <FontAwesomeIcon icon={arrow} style={{ width: 12, height: 12, color }} />
      </IconButton>
    )
  }

  prepareData = (data) => {
    let transformedData = data

    if (this.state.searchBy !== EMPTY) {
      transformedData = transformedData.filter((row) =>
        row[this.state.searchBy] && row[this.state.searchBy].toString().includes(this.state.search)
      )
    }

    if (this.state.sortBy !== EMPTY) {
      transformedData = sortBy(transformedData, [this.state.sortBy])
      if (this.state.sortOrder === ASC) {
        transformedData = transformedData.reverse()
      }
    }

    return transformedData
  }

  setSearchPhrase = event => {
    this.setState({ search: event.target.value })
  };

  switchSearchBy = (head) => {
    this.setState({
      searchBy: this.state.searchBy === head ? EMPTY : head,
      search: ''
    })
  }

  hideSearch = () => this.setState({ searchBy: EMPTY, search: '' })

  getSearch = (head, classes) => {
    const color = this.state.searchBy === head ? ACTIVE_FILTER_COLOR : NOT_ACTIVE_FILTER_COLOR

    return (
     <Tooltip
      classes={{
        tooltip: classes.htmlTooltip
      }}
      title={(
        <React.Fragment>
          <TextField
            onChange={this.setSearchPhrase}
            label="Search"
          />
          <IconButton style={{ padding: 5 }} onClick={this.hideSearch}>
            <FontAwesomeIcon icon={faTimes} style={{ width: 12, height: 12, color: NOT_ACTIVE_FILTER_COLOR }} />
          </IconButton>
        </React.Fragment>
      )}
      open={this.state.searchBy === head}
      interactive
      placement="top"
      disableFocusListener
      disableHoverListener
      disableTouchListener
    >
      <IconButton style={{ padding: 5 }} onClick={() => this.switchSearchBy(head)}>
        <FontAwesomeIcon icon={faSearch} style={{ width: 12, height: 12, color }} />
      </IconButton>
     </Tooltip>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table} padding='dense'>
          <TableHead>
            <TableRow>
              {this.props.heads.map(
                  (head) => (
                    <TableCell align={head.align || 'inherit'}>
                      {head.label}
                      {head.id && head.label && this.getSorting(head.id)}
                      {head.id && head.label && this.getSearch(head.id, classes)}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
              {this.prepareData(this.props.data).map((dataRow, index) => (
                  <TableRow key={dataRow.id} style={{ backgroundColor: index === this.props.selected ? '#ffeee8' : 'white' }}>
                      {this.props.heads.map((head) => (
                          <TableCell className={classes.tableCell} align={head.align || 'inherit'} >
                            {
                              head.renderer ?
                                head.renderer(dataRow[head.id], dataRow) :
                                <LabelClipboard text={dataRow[head.id] || ''} />
                            }
                          </TableCell>
                      ))}
                  </TableRow>
              ))}
          </TableBody>
        </Table>
        {this.props.children}
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);