import * as ACTION_TYPES from './actionTypes';
import axios from 'axios';

export const login = (username, password) => (dispatch) => {
    const user = {
        username: username,
        password: password
    }

    axios({
        method: 'post',
        url: '/users/login',
        data: user,
        withCredentials: true
      })
      .then((response) => {
        if(response.data === false){
           dispatch(userFailed('UserName or pasword mismatch'));
        }
        else{
          dispatch(addUser(response.data));
        }
      }, (error) => {
        console.log(error);
      });
}

export const addUser = (user) => ({
  type: ACTION_TYPES.LOGIN_SUCCESS,
  payload: user
});

export const userFailed = (errMss) => ({
  type: ACTION_TYPES.LOGIN_FAILED,
  payload: errMss
});


export const logout = () => (dispatch) => {
  axios({
    method: 'get',
    url: '/users/logout',
    withCredentials: true
  })
  .then((response) => {
    dispatch(logoutUser());
  }, (error) => {
    console.log(error);
  });
}

export const logoutUser = () => ({
  type: ACTION_TYPES.LOGOUT_SUCCESS,
  payload: null
})


export const postNewUser = (name, username, password ,email) => (dispatch) => {
  const newUser = {
    name: name,
    username: username,
    password: password,
    email: email
  }

  axios({
    method: 'post',
    url: '/users/signup',
    data: newUser,
    withCredentials: true
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });
}

export const fetchBooks = () => (dispatch) => {
  axios({
    method: 'get',
    url: '/books',
    withCredentials: true
  })
  .then((response) => {
    dispatch(addBooks(response.data));
  }, (error) => {
    dispatch(booksFailed(error));
  });
}

export const addBooks = (books) => ({
  type: ACTION_TYPES.BOOKS_SUCCESS,
  payload: books
});

export const booksFailed = (error) => ({
  type: ACTION_TYPES.BOOKS_FAILED,
  payload: error
});


export const favorite = (id) => (dispatch) => { //adding favorite to person's record
  axios({
    method: 'post',
    url: '/users/id',
    data: {id: id},
    withCredentials: true
  })
  .then((response) => {
    if(response.data === false){
       console.log('already in favorites'); //call favorites failed
    }
    else{
      dispatch(addFavorite(response.data));
    }
  }, (error) => {
    console.log(error);
  });
}

export const addFavorite = (user) => ({
  type: ACTION_TYPES.ADD_FAVORITE,
  payload: user
})


export const favoriteFailed = (errMss) => ({
  type: ACTION_TYPES.FAILED_FAVORITE,
  payload: errMss
})


export const removeFavorite = (id) => (dispatch) => { //removing favorite from person's record
  axios({
    method: 'put',
    url: '/users/id',
    data: {id: id},
    withCredentials: true
  })
  .then((response) => {
    if(response.data === false){
       console.log('failed to remove'); //call favorites remove failed and display it as the errMss
     }
    else{
      dispatch(addFavorite(response.data));
    }
  }, (error) => {
    console.log(error);
  });

  console.log(id);
}

export const addREmovedFavorite = (user) => ({
  type: ACTION_TYPES.REMOVE_FAVORITE,
  payload: user
});

export const fetchAllUsers = () => (dispatch) => {//fetching all users only admin 
  axios({
    method: 'get',
    url: '/users/admin/allusers',
    withCredentials: true
  })
  .then((response) => {
    if(response.data === false){
      dispatch(failedAllUsers('failed'));
    }
    else{
      dispatch(addAllUsers(response.data));
    }
  }, (error) => {
    dispatch(failedAllUsers(error));
  })
}

export const failedAllUsers = (errMss) => ({
  type: ACTION_TYPES.USERS_FAILED,
  payload: errMss
});

export const addAllUsers = (users) => ({
  type: ACTION_TYPES.ADD_USERS,
  payload: users
})


export const makeAdmin = (id) => (dispatch) => {
  axios({
    method: 'put',
    url: '/users/admin/makeadmin',
    data: {id: id},
    withCredentials: true
  })
  .then((response) => {
    if(response.data === false){
      dispatch(failedAllUsers('failed'));
    }
    else{
      dispatch(addAllUsers(response.data));
    }
  }, (error) => {
    dispatch(failedAllUsers(error));
  })
  console.log(id);

}

export const removeUser = (id) => (dispatch) => {//remove the user who is not an admin
  axios({
    method: 'put',
    url: '/users/admin/removeuser',
    data: {id: id},
    withCredentials: true
  })
  .then((response) => {
    if(response.data === false){
      dispatch(failedAllUsers('failed'));
    }
    else{
      dispatch(addAllUsers(response.data));
    }
  }, (error) => {
    dispatch(failedAllUsers(error));
  })
  console.log(id);

}

export const removeBook = (id) => (dispatch) => {//remove the book
  axios({
    method: 'put',
    url: '/users/admin/removebook',
    data: {id: id},
    withCredentials: true
  })
  .then((response) => {
    if(response.data === false){
      dispatch(booksFailed('failed'));
    }
    else{
      dispatch(addBooks(response.data));
    }
  }, (error) => {
    dispatch(booksFailed(error));
  })
  console.log(id);

}

export const addNewBook = (formData) => (dispatch) => {//add new book
  console.log(formData);
  /*axios({
    method: 'post',
    url: 'https://httpbin.org/anything',
    data: {fromData: formData},
    withCredentials: true,http://localhost:3001/books/add
    
      headers: {
        'content-type': 'multipart/form-data'
      }
    
  })*/
  axios.post('/books/add', formData )
  .then((response) => {
    if(response.data === false){
      dispatch(booksFailed('failed'));
    }
    else{
      dispatch(addBooks(response.data));
    }
    console.log(response);
  }, (error) => {
    dispatch(booksFailed(error));
    console.log(error);
  })
  .catch((err) => console.log(err));
  

}

