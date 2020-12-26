import React from 'react';
import {Jumbotron} from 'reactstrap';

function Footer(){
    return(
        <Jumbotron id="header">
            <div classsName = "col-md-4" id="footertext">
                Before logging in the only modules available are homePage signUp page and login page
            </div>
            <div className = "col-md-4" id="footertext">
                For a non-admin user the available modules are adding to favorite and removing his/her favorite and signUp page
            </div>
            <div className="col-md-4" id="footertext">
                For a admin user he has the permissions to remove a non-admin user or make him an admin, it also allows him/her to add books and remove books from DB and all the other non-admin function
            </div>
            <div>
                for a non admin user just signup and for an admin user use USERNAME: test2 and PASSWORD: password
            </div>
        </Jumbotron>
    );
}

export default Footer;