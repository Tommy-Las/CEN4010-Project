import React from 'react'
import {Card} from 'react-bootstrap';

//Creates the display for when a user is editing the their profile
export default function ProfileEditCard(props) {
  return (
    <Card className='form' >
    <Card.Title className="center title"><h3>Profile</h3></Card.Title>
        <Card.Body className='item'>      
            <form onSubmit={props.handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" className="formInput edit-input" name="name" id="name" value={props.name} onChange={props.handleChange} /> 
            <br />
            <label htmlFor="email">Email: </label>
            <input type="email" className="formInput edit-input" name="email" id="email" value={props.email} onChange={props.handleChange}/>
            <br />
            <label htmlFor="phoneNumber">Phone number: </label>
            <input type="tel" className="formInput edit-input" name="phoneNumber" id="phoneNumber" value={props.phoneNumber} onChange={props.handleChange}/>
            <br />
            <label htmlFor="address">Permanent address: </label>
            <input type="text" className="formInput edit-input" name="address" id="address" value={props.address} onChange={props.handleChange}/>
            <br />
            <label htmlFor="authorizedUsers">Authorized Users: </label>
            <input type="text" className="formInput edit-input" name="authorizedUsers" id="authorizedUsers" value={props.authorizedUsers} onChange={props.handleChange}/>
            <br />
            <button type="submit" className='loginButton card-button button' value={props.userID}>Save</button>
            </form>
        </Card.Body>
    </Card>
  )
}
