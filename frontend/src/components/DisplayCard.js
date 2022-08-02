import React from 'react'
import {Card} from 'react-bootstrap';
import EditCard from "./EditCard"

//Creates the display for each property in inventory
export default function DisplayCard(props) {
  return (
      <Card className='item-container' style={{ width: '1000px' }}>
          {props.editButton === true ?
          <>   
          <Card.Body className='item'>
              <Card.Title className='item-title'>{`${props.itemType}`}</Card.Title>
              <Card.Text> {`Estimated Cost: $${props.estimatedCost}`} </Card.Text>
              <Card.Text> {`Quantity: ${props.quantity}`} </Card.Text>
              <Card.Text> {`Description: ${props.description}`} </Card.Text>
              {!(props.image === "") && <Card.Img className='item-image' variant="primary" src={props.image.base64} height="180" />}
              {!(props.video === "") &&    <video width="320" height="240" controls>
                                              <source src={props.video.base64} type={props.video.type} />
                                           </video>  }
          </Card.Body>
          <Card.Footer className='card-footer'>
            <button onClick={props.toggle} className='loginButton card-button' value={props._id}>Edit</button>
            <button onClick={props.deleteProperty} className='loginButton card-button' value={props._id}>Delete</button>
        </Card.Footer>
        </>
          : 
          <EditCard toggle={props.toggle} updateProperty={props.updateProperty} deleteProperty={props.deleteProperty} setAllHomeInfo={props.setAllHomeInfo} 
                    image={props.image} quantity={props.quantity}  _id={props._id} itemType={props.itemType} editButton={props.editButton}
                    estimatedCost={props.estimatedCost} description={props.description} video={props.video}   />

        }
    </Card>

  )
}

