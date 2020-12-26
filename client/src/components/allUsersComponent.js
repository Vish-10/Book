import React from 'react';
import { CardBody, Card, CardTitle, CardSubtitle, Button, ButtonGroup} from 'reactstrap';


function RenderUsers(users, makeAdmin, removeUser){
    var render = users.map((user) => {
        return(
                <div className = "col-md-4">
                    <Card>
                        <CardBody>
                            <CardTitle tag = "h5">{user.username}</CardTitle>
                            <CardSubtitle tag = "h6" className = "mb-2 text-muted">{user.name}</CardSubtitle>
                        </CardBody>
                        <ButtonGroup>
                            {user.admin? null:<Button color="success" onClick={() => makeAdmin(user._id)}>Make Admin</Button>} 
                            {user.admin? null: <Button color="danger" onClick={() => removeUser(user._id)}>Remove User</Button>}
                        </ButtonGroup>
                        
                    </Card>
                </div>
            
        );
    })

    return render;
} 


function AllUser(props){
    return(
        <div className = "container">
            
                <div className = "row">
                    {RenderUsers(props.users.users, props.makeAdmin, props.removeUser)}
                </div>
            
        </div>
    );
}

export default AllUser;