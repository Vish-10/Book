import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Logger from 'redux-logger';
import {User} from './users';
import {Book} from './books';
import {AllUsers} from './allUsers';

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            User: User,
            Book: Book,
            AllUsers: AllUsers
        }),
        applyMiddleware(thunk, Logger)
    );

    return store;
}
