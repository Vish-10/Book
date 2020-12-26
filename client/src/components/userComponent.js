import React from 'react';
import { CardBody, Card, CardTitle, CardSubtitle, CardImg, Button} from 'reactstrap';


function RenderList(list, removeFavorite){
    

   
    var result = list.map((book) => {
        return(
            <div className = "col - 6">
                <Card>
                    <CardImg top width = "50" height = "200" src = 'https://media.newyorker.com/photos/5d374aa883688700083be71e/16:9/w_1200,h_630,c_limit/culture-book.jpg' alt = {book.name} />
                    <CardBody>
                        <CardTitle tag = "h5">Name: {book.name}</CardTitle>
                        <CardSubtitle tag = "h6" className = "mb-2 text-muted">Author: {book.author}</CardSubtitle>
                        <h6>Price: {book._id}</h6>
                        <Button outline  color = "danger" onClick={() => removeFavorite(book._id)}>Remove</Button>
                    </CardBody>
            
                </Card>
            </div>
            
        );
    })

    return result;
}



function User(props){
    return(
        <div className = "container">
            
                <div className = "row justify-content-md-center">
                    <Card>
                        <CardBody>
                            <CardTitle tag = "h5">Name:&nbsp;&nbsp;&nbsp;&nbsp;{props.user.username}</CardTitle>
                            <CardSubtitle tag = "h6" className = "mb-2">Username: {props.user.name}</CardSubtitle>
                            <h6>ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.user._id}</h6>
                            <h6>E-Mail:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.user.email}</h6>
                            <h6>Books: <br /></h6>
                            <div className = "row">
                                {RenderList(props.user.list, props.removeFavorite)}
                            </div>
                        </CardBody>
                    </Card>
                           
                </div>
            
        </div>
    );
}

export default User;