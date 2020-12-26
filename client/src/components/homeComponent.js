import React from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, ButtonGroup
  } from 'reactstrap';
import {Link, useRouteMatch} from 'react-router-dom';


function RenderBooks(books, isAuthenticated, favorite, removeBook, user){
    
   

    let { url} = useRouteMatch();
    var render = books.map((book) => {
        return(
                <div className = "col-md-4 home">
                    <Card>
                        <div className = "objects">
                        <Link to = {`${url}/${book._id}`} >
                            <CardBody >
                            <CardImg top width = "100" height = "200" src = 'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=590&h=800&D80F3D79-4382-49FA-BE4B4D0C62A5C3ED' alt = {book.name} />
                                <CardTitle tag = "h5">{book.name}</CardTitle>
                                <CardSubtitle tag = "h6" className = "mb-2 text-muted">{book.author}</CardSubtitle>
                            </CardBody>
                        </Link>
                        <div className = "row justify-content-center">
                        <ButtonGroup>
                        {isAuthenticated? <Button color = "success" onClick =  {()=>favorite(book._id)}>Add to favorite</Button>:null}
                        {user?user.admin? <Button color = "danger" onClick = {() => removeBook(book._id)}>Remove Book</Button>: null :null}
                        </ButtonGroup>
                        </div>
                        
                        </div>
                       
                    </Card>
                </div>
            
        );
    })

    return render;
}


function Home(props){

    
    return(
       
            <div className = "container">
            <div className = "row">
                {RenderBooks(props.BOOKS, props.isAuthenticated, props.favorite, props.removeBook, props.user)}
            </div>
            </div>
        
        
    );
}

export default Home;