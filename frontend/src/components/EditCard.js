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
      <Card.Body>
          <form onSubmit={props.updateProperty}>
              <Card.Text>
                  <FileBase64 multiple={false} defaultValue={props.image1} onDone = {(base64)=> props.setAllHomeInfo(prevCard => { return prevCard.map((card) => {
                                                                                                          return card._id === props._id ? {...card, "image1": base64} : card  }) }) } />
                  <br/>
                  <FileBase64 multiple={false} value={props.image2} onDone = {(base64)=> props.setAllHomeInfo(prevCard => { return prevCard.map((card) => {
                                                                                                          return card._id === props._id ? {...card, "image2": base64} : card }) }) } />
                  <br/>
                  <FileBase64 multiple={false} value={props.image3} onDone = {(base64)=> props.setAllHomeInfo(prevCard => { return prevCard.map((card) => {
                                                                                                          return card._id === props._id ? {...card, "image3": base64} : card }) }) } />
                  <br/>
                  <label htmlFor="itemType">Type of item: </label>
                  <input type="text" className="formInput" id="itemType" name="itemType" defaultValue={props.itemType} onChange={handleChange} required/>
                  <br />
                  <label htmlFor="estimatedCost">Estimated cost: </label>
                  <input type="number" id="estimatedCost" name="estimatedCost" defaultValue={props.estimatedCost} onChange={handleChange} />
                  <br />
                  <label htmlFor="description">Description: </label>
                  <input type="text" id="description" name="description" defaultValue={props.description} onChange={handleChange} />
                  <br />
              </Card.Text>
              <button  id="updateButton" value={props._id}>Save</button>
              <Button onClick={props.deleteProperty} type="button" id="deleteButton" variant="primary" value={props._id}>Delete</Button>
          </form>
      </Card.Body>
  )
}
