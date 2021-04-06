import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as BookSaveStore from '../store/BookSaveStore';
import { Button, TextField, Theme } from '@material-ui/core';
import { Book } from '../shared/shared-types/Book';

type HasBook = {
  book: Book;
}

type BookCreateProps =
BookSaveStore.BookSaveState 
& typeof BookSaveStore.actionCreators
& HasBook

class BookCreateContainerComponent extends React.PureComponent<BookCreateProps> {
    form: React.RefObject<unknown>;

    constructor(props: BookCreateProps) {
        super(props);
        this.state = {
            author: '',
            name: '',
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.form = React.createRef();
        
    }

  // public componentDidMount() {
  //     if(this.props.book){
  //       this.setInitialValues(this.props.book);
  //     }
  // }

  public setInitialValues(book: Book) {
    this.setState({
      ...this.state,
      name: book.name,
      author: book.author,
      year: book.year,
      quantity: book.quantity,
    })
  }

  public render() {
    return (
      <React.Fragment>
        {this.renderForm()}
      </React.Fragment>
    );
  }

  private handleChange(event: any) {
        switch(event.target.name){
            case('Name'):{
                this.setState({
                    ...this.state,
                    name: event.target.value
                });
                break;
            }
            case('Author'):{
                this.setState({
                    ...this.state,
                    author: event.target.value
                });
                break;
            }
            case('Year'):{
                this.setState({
                    ...this.state,
                    year: event.target.value
                });
                break;
            }
            case('Quantity'):{
                this.setState({
                    ...this.state,
                    quantity: event.target.value
                });
                break;
            }
        }
        
  }

  private handleSubmit(event: any) {
    this.props.saveBook({
        type: BookSaveStore.SaveBookType,
        payload: this.state as Book,
    });
    event.preventDefault();
  }

  // TODO: extract to component
  private renderForm() {
    return (
      <form style={ { display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' } } onSubmit={this.handleSubmit}>
          <TextField style={ { width:"40%", marginTop:"10px"} } id="outlined-basic" onChange={this.handleChange} label="Name" name="Name" variant="outlined" />
          <TextField style={ { width:"40%", marginTop:"10px"} } id="outlined-basic" onChange={this.handleChange} label="Author" name="Author" variant="outlined" />
          <TextField style={ { width:"40%", marginTop:"10px"} } id="outlined-basic" onChange={this.handleChange} label="Year" name="Year" variant="outlined" />
          <TextField style={ { width:"40%", marginTop:"10px", marginBottom: "10px" } } id="outlined-basic" onChange={this.handleChange} label="Quantity" name="Quantity" variant="outlined" />
          <Button style={ { width: '150px'} }type="submit" variant="contained" color="primary" value="Submit">
            Create book
          </Button>
      </form>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.bookSave, // Selects which state properties are merged into the component's props
  BookSaveStore.actionCreators // Selects which action creators are merged into the component's props
)(BookCreateContainerComponent as any);
