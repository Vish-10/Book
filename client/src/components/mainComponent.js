import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Header from './headerComponent';
import Footer from './footerComponent';
import Home from './homeComponent';
import BookDetail from './bookDetailComponent';
import User from './userComponent';
import Sign from './signComponent';
import AllUser from './allUsersComponent';
import AddBook from './addBookComponent';

import {login, postNewUser, fetchBooks, logout, favorite, removeFavorite, fetchAllUsers, makeAdmin, removeUser, removeBook, addNewBook} from '../redux/actionCreators';

function mapStateToProps(state) {
    return{
        BOOKS: state.Book,
        USER : state.User,
        AllUsers: state.AllUsers
    }
}

const mapDispatchToProps = dispatch => {
    return{
        login: (username, password) => dispatch(login(username, password)),
        postNewUser: (name, username, password, email) => dispatch(postNewUser(name, username, password, email)),
        fetchBooks: () => dispatch(fetchBooks()),
        logout: () => dispatch(logout()),
        favorite: (id) => dispatch(favorite(id)),
        removeFavorite: (id) => dispatch(removeFavorite(id)),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        makeAdmin: (id) => dispatch(makeAdmin(id)),
        removeUser: (id) => dispatch(removeUser(id)),
        removeBook: (id) => dispatch(removeBook(id)),
        addNewBook: (formData) => dispatch(addNewBook(formData))
    }
}

class Main extends Component{
    constructor(){
        super();
        this.state = {
           
        };
    }

    componentDidMount(){
        this.props.fetchBooks();
    }

    render(){
        
        
        return(
                 <div className="bg">
                    <Header login = {this.props.login} user = {this.props.USER} logout = {this.props.logout} fetchAllUsers = {this.props.fetchAllUsers}/>
                    <Switch>
                        <Route exact path = "/home">
                            <Home BOOKS = {this.props.BOOKS.books} isAuthenticated = {this.props.USER.isAuthenticated} favorite = {this.props.favorite} user = {this.props.USER.user} removeBook={this.props.removeBook}/>
                        </Route>
                        <Route exact path = "/books/add">
                            {!this.props.USER.isAuthenticated?   <Redirect to ="/home" />: <AddBook addNewBook = {this.props.addNewBook}/>}
                        </Route>
                        <Route exact path = "/users/signup">
                            <Sign postNewUser = {this.props.postNewUser} />
                        </Route>
                        <Route exact path = "/admin/users/:userId">
                            {!this.props.USER.isAuthenticated?<Redirect to="/home" />  :<AllUser  users= {this.props.AllUsers} makeAdmin = {this.props.makeAdmin} removeUser = {this.props.removeUser}/>}
                        </Route>
                        <Route exact path = "/:user">
                        
                            {!this.props.USER.isAuthenticated ? <Redirect to="/home" /> : <User user = {this.props.USER.user} removeFavorite={this.props.removeFavorite} />} 
                        </Route>
                        <Route path = "/home/:id" children = {<BookDetail BOOKS = {this.props.BOOKS.books} isAuthenticated = {this.props.USER.isAuthenticated} favorite = {this.props.favorite} /> } />
                       
                        <Redirect exact from = "/" to = "/home" />
                    </Switch>
                    <Footer />
                </div>
           
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));