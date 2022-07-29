import React from 'react'
import {Card, Button} from 'react-bootstrap';
import FileBase64 from "react-file-base64"


export default function EditCard(props) {


        //Updates the state formData 
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
        <FileBase64 multiple={false} onDone = {(base64)=> props.setAllHomeInfo(prevCard => { return prevCard.map((card) => {
                                                                                             return card._id === props._id ? {...card, base64: base64} : card  }) }) } />
        <br/>
        <FileBase64 multiple={false} onDone = {(base64)=> props.setAllHomeInfo(prevCard => { return prevCard.map((card) => {
                                                                                             return card._id === props._id ? {...card, base64: base64} : card }) }) } />
        <br/>
        <FileBase64 multiple={false} onDone = {(base64)=> props.setAllHomeInfo(prevCard => { return prevCard.map((card) => {
                                                                                             return card._id === props._id ? {...card, base64: base64} : card }) }) } />
        <br/>
        <label htmlFor="location">Location: </label>
        <input type="text" className="formInput" id="location" name="location" defaultValue={props.location} onChange={handleChange} required/>
        <br />
        <label htmlFor="propertyType">Property type: </label>
        <input type="text" id="propertyType" name="propertyType" defaultValue={props.propertyType} onChange={handleChange} />
        <br />
        <label htmlFor="sqft">Sqft: </label>
        <input type="number" id="sqft" name="sqft" defaultValue={props.sqft} onChange={handleChange} />
        <br />
        <label htmlFor="estimatedCost">Estimated cost: </label>
        <input type="number" id="estimatedCost" name="estimatedCost" defaultValue={props.estimatedCost} onChange={handleChange} />
        <br />
        <label htmlFor="bedroomCount">Number of bedrooms: </label>
        <input type="number"  id="bedroomCount" name="bedroomCount" defaultValue={props.bedroomCount} onChange={handleChange} />
        <br />
        <label htmlFor="bathRoomCount">Number of bathrooms: </label>
        <input type="number" id="bathRoomCount" name="bathRoomCount" defaultValue={props.bathRoomCount} onChange={handleChange} />
        <br />
        <label htmlFor="units">Number of units (if applicable): </label>
        <input type="number" id="units" name="units" defaultValue={props.units} onChange={handleChange} />
        <br />
        <label htmlFor="other" >Other details: </label>
        <textarea id="other" name="other" defaultValue={props.other} onChange={handleChange}></textarea>
        <br />
     </Card.Text>
        <button  id="updateButton" value={props._id}>Save</button>
        <Button onClick={props.deleteProperty} type="button" id="deleteButton" variant="primary" value={props._id}>Delete</Button>
        </form>
     </Card.Body>
  )
}
