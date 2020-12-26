import * as ACTION_TYPES from './actionTypes';

export const AllUsers = (state = {errMss: null, users: []}, action) => {
    switch(action.type){
        case ACTION_TYPES.ADD_USERS:
            return{...state, errMss: null, users: action.payload};


        case ACTION_TYPES.USERS_FAILED:
            return{...state, errMss: action.payload, users: null};
        
        

        default:
            return state;
    }
}