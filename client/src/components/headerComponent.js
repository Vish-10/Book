import React, {useState} from 'react';

import {
    Jumbotron,
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavbarBrand,
    Modal,
    Button,
    FormGroup,
    Form,
    ModalFooter,
    ModalBody,
    NavbarText,
    Label,
    ModalHeader,
    Col,
    Input
} from 'reactstrap';

import {NavLink} from 'react-router-dom';


function Header(props){

    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = () => setIsOpen(!isOpen);

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    function handleSubmit(){
        props.login(username, password);
        setUserName('');
        setPassword('');
        toggleModal();
    }



    

    return(
        <React.Fragment>
            <Jumbotron id="header">
                <Navbar  dark expand = "sm">
                    <NavbarToggler onClick = {toggleNav}/>
                    <NavbarBrand><NavLink className = "nav-link" to = "/home"><i classname = "fa fa-thumbs-up fa-lg"></i></NavLink></NavbarBrand>
                    <Collapse isOpen = {isOpen} navbar>
                        <Nav className = "mr-50" navbar>
                            <NavItem>
                                <NavLink className = "nav-link"  to = "/home"><i className = "fa fa-home fa-lg" id="textdark">Home</i></NavLink>
                            </NavItem>
                            <NavItem>
                                {
                                    props.user.user? props.user.user.admin?<NavLink className = "nav-link" to = "/books/add" id="textdark"><i className =" fa fa-book fa-lg">Add Books</i></NavLink> : null : null
                                }
                            </NavItem>
                            <NavItem>
                                {
                                    props.user.isAuthenticated? <NavLink className = "nav-link" to = {`/${props.user.user._id}`} id="textdark"><i className ="fa fa-user-circle-o fa-lg">{props.user.user.username}</i></NavLink>:null
                                }
                            </NavItem>
                            <NavItem>
                                {
                                    props.user.user? props.user.user.admin?<NavLink className = "nav-link" to = {`/admin/users/${props.user.user._id} `} onClick ={() => props.fetchAllUsers()} id="textdark"><i className="fa fa-users ga-lg">Users</i></NavLink> : null : null
                                }
                            </NavItem>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/users/signup"><i className = "fa fa-sign-in fa-lg" id="textdark">sign-up</i></NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>
                             {props.user.isAuthenticated?<Button color="dark" onClick={props.logout}>Logout</Button>:<Button  variant="dark" onClick = {toggleModal}>Login</Button> }
                        </NavbarText>
                    </Collapse>
                </Navbar>
            </Jumbotron>
            <div className = "container">
                <Modal isOpen = {modal} toggle = {toggleModal}>
                    <ModalHeader toggle = {toggleModal}></ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for = "username" sm = {4} id="textdark">Username</Label>
                                <Col sm = {8}>
                                    <Input type = "text" name = "username" id = "username" placeholder = "User Name" onChange={e => setUserName(e.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for = "password" sm = {4} id="textdark">Password</Label>
                                <Col sm = {8}>
                                    <Input type = "password" name = "password" id = "password" placeholder = "Password" onChange={e => setPassword(e.target.value)}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color = "dark" onClick = {handleSubmit}>Sign-in</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </React.Fragment>
    );
}

export default Header;