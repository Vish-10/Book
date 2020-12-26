import * as ACTION_TYPES from './actionTypes';

export const Book = (state = {errMss: null, books: []}, action) => {
    switch(action.type){
        case ACTION_TYPES.BOOKS_FAILED:
            return{...state, errMss: action.payload, books: null};


        case ACTION_TYPES.BOOKS_SUCCESS:
            return{...state, errMss: null, books: action.payload};

        default:
            return state;
    }
}