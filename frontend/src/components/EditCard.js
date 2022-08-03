import React from 'react'
import {Card} from 'react-bootstrap';
import FileBase64 from "react-file-base64"

//Creates the display for when a user is editing the property
export default function EditCard(props) {

        //Updates the state allHomeInfo 
        function handleChange (event) {

            const {name, value} = event.target;
     
              props.setAllHomeInfo(prevCard => {
                  return prevCard.map((card) => {
                      return card._id === props._id ? {...card, [name]: value} : card
                  })
              })    

        }

        
  return (
    <>
      <Card.Body className='border'>
              <Card.Text>
                  <br/>
                  <label htmlFor="itemType">Type of item: </label>
                  <input type="text" className="formInput  edit-input" name="itemType" defaultValue={props.itemType} onChange={handleChange} required/>
                  <br />
                  <label htmlFor="estimatedCost">Estimated cost: </label>
                  <input type="number" className="formInput edit-input" name="estimatedCost" defaultValue={props.estimatedCost} onChange={handleChange} />
                  <br />
                  <label htmlFor="quantity">Quantity: </label>
                  <input type="text" className="formInput edit-input" name="quantity" defaultValue={props.quantity} onChange={handleChange} />
                  <br />
                  <label htmlFor="description">Description: </label>
                  <input type="text" className="formInput edit-input" name="description" defaultValue={props.description} onChange={handleChange} />
                  <br />
                  <label htmlFor="image">Image: </label>
                  <FileBase64 name="image" multiple={false} defaultValue={props.image} onDone = {(base64)=> props.setAllHomeInfo(prevCard => { return prevCard.map((card) => {                                                                                  
                                                                                                 return card._id === props._id ? {...card, "image": base64} : card  }) }) } />
                  <br />                                                                                 
                  <label htmlFor="video">Video: </label>                                                                        
                  <FileBase64 name="video" multiple={false} defaultValue={props.video} onDone = {(base64)=> props.setAllHomeInfo(prevCard => { return prevCard.map((card) => {                                                                                  
                                                                                                 return card._id === props._id ? {...card, "video": base64} : card  }) }) } />
              </Card.Text>
            </Card.Body>
            <Card.Footer className='card-footer'>
              <button className='loginButton' value={props._id} id="updateButton" onClick={props.updateProperty}>Save</button>
            </Card.Footer>
    </>
  )
}
