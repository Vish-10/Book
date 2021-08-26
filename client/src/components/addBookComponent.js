import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input,  Col } from 'reactstrap';


function AddBook(props){

    const [name, setName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    function handleSubmit(){
        //console.log(name + authorName, price, image);
        const data = new FormData();
        data.append("name", name);
        data.append("authorName", authorName);
        data.append("price", price);
       
        data.append("photo", image);
        props.addNewBook(data);
    }

    return(
        <div className = "container">
            <div className = "row offset-2">
            <Form>
                <FormGroup row>
                    <Label for="name" id="textdark" sm={4}>Name: </Label>
                    <Col sm={8}>
                    <Input type="text" name="name" id="name" placeholder="Book Name" onChange = {e => setName(e.target.value)}/></Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="authorname" id="textdark" sm={4}>Author Name: </Label>
                    <Col sm={8}>
                    <Input type="text" name="authorname" id="authorname" placeholder="Author Name" onChange = {e => setAuthorName(e.target.value)}/></Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="price" id="textdark" sm={4}>Price: </Label>
                    <Col sm={8}>
                    <Input type="number" name="price" id="price" placeholder="Price" onChange = {e => setPrice(e.target.value)}/></Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="photo" id="textdark" sm={4}>Book Image: </Label>
                    <Col sm={8}>
                    <Input type="file" name="photo" id="photo" placeholder="photo" accept = ".jpg" onChange = {e => setImage(e.target.files[0])}/></Col>
                </FormGroup>
                <Button color ="success" onClick={handleSubmit} size="lg">Submit</Button>
            </Form>
            </div>
        </div>
    );
}

export default AddBook;