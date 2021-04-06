import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as BookListStore from '../store/BookListStore';
import { withStyles, Theme, createStyles, TableCell, TableRow, TableContainer, TableHead, TableBody, Table, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type BookListProps =
BookListStore.BookListState 
& typeof BookListStore.actionCreators

// const TableCell = withStyles((theme: Theme) =>
//   createStyles({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }),
// )(TableCell);

// const StyledTableRow = withStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   }),
// )(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth:'100%'
  },
})



class BookListContainerComponent extends React.PureComponent<BookListProps> {
  public componentDidMount() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        { this.props.loaded && this.props.books.length > 0 ? this.renderBookList() : this.renderNoData() }
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    this.props.loadBooks();
  }

  // TODO: extract to component
  private renderBookList() {
    return (
      <TableContainer component={Paper}>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.books.map((book) => (
                  <TableRow key={book.name}>
                    <TableCell component="th" scope="row">
                    {book.name }
                    </TableCell>
                    <TableCell align="right">{book.author}</TableCell>
                    <TableCell align="right">{book.year}</TableCell>
                    <TableCell align="right">{book.quantity}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
        </Table>
      </TableContainer>
    );
  }

  private renderNoData() {
    return (
      <div>
        No data to show
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.bookList, // Selects which state properties are merged into the component's props
  BookListStore.actionCreators // Selects which action creators are merged into the component's props
)(BookListContainerComponent as any);
