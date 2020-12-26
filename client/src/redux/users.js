import * as ACTION_TYPES from './actionTypes';

export const User = (state = {errMss: null, user: null, isAuthenticated: false}, action) => {
    switch(action.type){
        case ACTION_TYPES.LOGIN_FAILED:
            return{...state, errMss: action.payload, user: null,  isAuthenticated: false};


        case ACTION_TYPES.LOGIN_SUCCESS:
            return{...state, errMss: null, user: action.payload, isAuthenticated: true};

        case ACTION_TYPES.LOGOUT_SUCCESS:
            return{...state, errMss: null, user: null, isAuthenticated: false};

        case ACTION_TYPES.ADD_FAVORITE:
            return{...state, errMss: null, user: action.payload, isAuthenticated: true};

        case ACTION_TYPES.REMOVE_FAVORITE:
            return{...state, errMss: null, user: action.payload, isAuthenticated: true};

        default:
            return state;
    }
}