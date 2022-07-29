import React from 'react'
import {Card, Button} from 'react-bootstrap';
import EditCard from "./EditCard"


export default function DisplayCard(props) {
  return (
    <Card style={{ width: '1000px' }}>
    {props.editButton === true ?   
      <Card.Body>
        {!props.image1 === "" && <Card.Img variant="primary" src={props.image1.base64} height="250" />}
        {!props.image2 === "" && <Card.Img variant="primary" src={props.image2.base64} height="250" />}
        {!props.image3 === "" && <Card.Img variant="primary" src={props.image3.base64} height="250" />}
        <Card.Title>{`Location: ${props.location}`}</Card.Title>
        <Card.Text> {`Property type: ${props.propertyType}`} </Card.Text>
        <Card.Text> {`Sqft: ${props.sqft}`} </Card.Text>
        <Card.Text> {`Estimated Cost: ${props.estimatedCost}`} </Card.Text>
        <Card.Text> {`Bedroom(s): ${props.bedroomCount}`} </Card.Text>
        <Card.Text> {`BathRoom(s): ${props.bathRoomCount}`} </Card.Text>
        <Card.Text> {`Units: ${props.units}`} </Card.Text>
        <Card.Text> {`Other: ${props.other}`} </Card.Text>
        <Button onClick={props.toggle} variant="primary" value={props._id}>Edit</Button>
        <Button onClick={props.deleteProperty} id="deleteButton" variant="primary" value={props._id}>Delete</Button>
      </Card.Body>
    : 
    <EditCard toggle={props.toggle} updateProperty={props.updateProperty} deleteProperty={props.deleteProperty} setAllHomeInfo={props.setAllHomeInfo} 
    image1={props.image1} image2={props.image2} image3={props.image3} _id={props._id} location={props.location} propertyType={props.propertyType} editButton={props.editButton}
    sqft={props.sqft} bedroomCount={props.bedroomCount} bathRoomCount={props.bathRoomCount} units={props.units} estimatedCost={props.estimatedCost} other={props.other} />
   }
   </Card>

  )
}

