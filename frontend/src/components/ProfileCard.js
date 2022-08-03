import React from 'react'
import {Card} from 'react-bootstrap';

//Creates the display for the profile 
export default function ProfileCard(props) {
  return (
    <Card className='form'>
        <Card.Title className="center title"><h3>Profile</h3></Card.Title>
          <Card.Body className='item-profile'>
              <Card.Text> {`Name: ${props.name}`} </Card.Text>
              <Card.Text> {`Email: ${props.email}`} </Card.Text>
              <Card.Text> {`Phone number: ${props.phoneNumber}`} </Card.Text>
              <Card.Text> {`Permanent address: ${props.address}`} </Card.Text>
              <Card.Text> {`Authorized users: ${props.authorizedUsers}`} </Card.Text>
              <button onClick={props.toggle} className='loginButton card-button button' value={props.userID}>Edit</button> 
          </Card.Body>
      </Card>
  )
}

