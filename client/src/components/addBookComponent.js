import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input,  Col } from 'reactstrap';

/*const AddBook = (props) => {
    const [newBook, setNewBook] = useState(
        {
            name: '',
            author: '',
            price:'',
            photo: '',
        }
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('photo', newBook.photo);
        formData.append('name', newBook.name);
        formData.append('author', newBook.author);
        formData.append('price', newBook.price);
        props.addNewBook(formData);
     //call the redux actionCreator
    }

    const handleChange = (e) => {
        setNewBook({...newBook, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewBook({...newBook, photo: e.target.files[0]});
    }

    return (
        <form onSubmit={handleSubmit} enctype='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />
            <br />
            <input 
                type="text"
                placeholder="name"
                name="name"
                value={newBook.name}
                onChange={handleChange}
            />
             <br />
            <input 
                type="text"
                name="author"
                placeholder = "author"
                value={newBook.author}
                onChange={handleChange}
            />
                 <br />
            <input 
                type="number"
                name="price"
                placeholder = "price"
                value={newBook.price}
                onChange={handleChange}
            />
             <br />
            <input 
                type="submit"
            />
        </form>
    );
}*/

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