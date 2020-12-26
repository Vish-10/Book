import React from 'react';
import { Media, Button, ButtonGroup } from 'reactstrap';
import {useParams} from 'react-router-dom';

function BookDetail(props){
    let { id } = useParams();
    let book = props.BOOKS.filter((bk) => bk._id === id)[0];

    function handleFavorite(){
        props.favorite(id);
    }
    return(
        <div className= "container">
            <div className="row">
                <Media>
                    <Media left middle href = "#">
                        <div className="col-7"><Media object src = 'https://www.thesecret.tv/wp-content/uploads/2020/04/icon-books-578x384.png' alt = {book.name} height="500" width="500"/></div>
                        
                    </Media>
                    <div className="col-5">
                    <Media body>
                        <Media heading>
                            {book.name}
                        </Media>
                        <div>
                            Author: {book.author} <br />
                            Price: {book.price}
                        </div>
                        <ButtonGroup>
                        {props.isAuthenticated? <Button color = "success" onClick = {handleFavorite}>Add to favorite</Button>:null}
                        
                        </ButtonGroup>
                    </Media>
                    </div>
                   
                </Media>
            </div>
        </div>
    );
}

export default BookDetail;