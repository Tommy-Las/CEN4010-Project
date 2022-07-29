import React from 'react'
import {Card, Button} from 'react-bootstrap';
import EditCard from "./EditCard"

//Creates the display for each property in inventory
export default function DisplayCard(props) {
  return (
      <Card style={{ width: '1000px' }}>
          {props.editButton === true ?   
          
          <Card.Body>
              {!(props.image1 === "") && <Card.Img variant="primary" src={props.image1.base64} height="250" />}
              {!(props.image2 === "") && <Card.Img variant="primary" src={props.image2.base64} height="250" />}
              {!(props.image3 === "") && <Card.Img variant="primary" src={props.image3.base64} height="250" />}
              <Card.Title>{`${props.itemType}`}</Card.Title>
              <Card.Text> {`Estimated Cost: ${props.estimatedCost}`} </Card.Text>
              <Card.Text> {`Description: ${props.description}`} </Card.Text>
              <Button onClick={props.toggle} variant="primary" value={props._id}>Edit</Button>
              <Button onClick={props.deleteProperty} id="deleteButton" variant="primary" value={props._id}>Delete</Button>
          </Card.Body>

          : 

          <EditCard toggle={props.toggle} updateProperty={props.updateProperty} deleteProperty={props.deleteProperty} setAllHomeInfo={props.setAllHomeInfo} 
                    image1={props.image1} image2={props.image2} image3={props.image3} _id={props._id} itemType={props.itemType} editButton={props.editButton}
                    estimatedCost={props.estimatedCost} description={props.description} />

        }
    </Card>

  )
}

