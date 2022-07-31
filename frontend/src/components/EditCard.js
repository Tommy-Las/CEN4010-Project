import React from 'react'
import {Card, Button} from 'react-bootstrap';
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
      <Card.Body>
          <form onSubmit={props.updateProperty}>
              <Card.Text>
                  <br/>
                  <label htmlFor="itemType">Type of item: </label>
                  <input type="text" className="formInput  edit-input" name="itemType" defaultValue={props.itemType} onChange={handleChange} required/>
                  <br />
                  <label htmlFor="estimatedCost">Estimated cost: </label>
                  <input type="number" className="formInput edit-input" name="estimatedCost" defaultValue={props.estimatedCost} onChange={handleChange} />
                  <br />
                  <label htmlFor="description">Quantity: </label>
                  <input type="text" className="formInput edit-input" name="description" defaultValue={props.quantity} onChange={handleChange} />
                  <br />
                  <label htmlFor="description">Description: </label>
                  <input type="text" className="formInput edit-input" name="description" defaultValue={props.description} onChange={handleChange} />
                  <br />
                  <h5>Image</h5>
                  <FileBase64 multiple={false} defaultValue={props.image1} onDone = {(base64)=> props.setAllHomeInfo(prevCard => { return prevCard.map((card) => {                                                                                  return card._id === props._id ? {...card, "image1": base64} : card  }) }) } />
              </Card.Text>
              
          </form>
      </Card.Body>
      <Card.Footer className='card-footer'>
        <button className='loginButton' value={props._id}>Save</button>
      </Card.Footer>
    </>
  )
}
