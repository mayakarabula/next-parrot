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
    overflowX: 'auto'
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
const EMPTY = ''

class SimpleTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sortBy: props.sortBy || EMPTY,
      sortOrder: props.sortOrder || EMPTY,
      searchBy: {},
      isShowingSearch: false
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

  switchSearch = () => this.setState({
    isShowingSearch: !this.state.isShowingSearch,
    searchBy: {}
  })

  prepareData = (data) => {
    let transformedData = data
    let searchEntries = Object.entries(this.state.searchBy)

    if (searchEntries.length !== 0) {
      transformedData = transformedData.filter((row) => {
          let found = true
          searchEntries.forEach(([ key, phrase ]) => {
            if (row[key] && row[key].toString().toLowerCase().includes(phrase) === false) {
              found = false
            }
          })
          return found
        }
      )
    }

    if (this.state.sortBy !== EMPTY) {
      transformedData = sortBy(transformedData, [this.state.sortBy])
      if (this.state.sortOrder === DESC) {
        transformedData = transformedData.reverse()
      }
    }

    return transformedData
  }

  setSearchBy = (head) => (event) => {
    const searchBy = this.state.searchBy
    searchBy[head] = event.target.value
    this.setState({ searchBy })
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table} padding='dense'>
          <TableHead>
            <TableRow>
              {this.props.heads.map(
                  (head, index) => (
                    <TableCell align={head.align || 'inherit'}>
                      {head.label}
                      {head.id && head.label && this.getSorting(head.id)}

                      {index === (this.props.heads.length -1) && (
                        <IconButton
                          onClick={this.switchSearch}
                          style={{ padding: 5 }}
                        >
                          <FontAwesomeIcon icon={faSearch} style={{ width: 12, height: 12 }} />
                        </IconButton>
                      )}
                    </TableCell>
                  )
              )}
            </TableRow>
            {this.state.isShowingSearch && <TableRow>
              {this.props.heads.map(
                  (head) => (
                    (head.id && head.label) ? <TableCell align={head.align || 'inherit'}>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <TextField
                          placeholder='Search column'
                          onChange={this.setSearchBy(head.id)}
                          inputProps={{ style: { fontSize: 12, color: 'rgba(53, 53, 53, 0.87)' } }}
                          style={{ flex: 1 }}
                        />
                      </div>
                    </TableCell> : <TableCell />
                  )
              )}
            </TableRow>}
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