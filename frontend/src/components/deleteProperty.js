import React, {useState} from "react"
import axios from "axios"

function DeleteProperty(){ 
    const { user } = useUserContext();
    //User ID
    const user_id = user.uid;

    const [location, setLocation] = useState(""); //Stores submitted location 

    //Update location state 
    function handleChange(event) {
      const {value} = event.target;
      setLocation(value);
    }
  
  
    //Does delete request to delete a property
    function deleteProperty(event) {
      event.preventDefault(); //Stops the page from refreshing after pressing the submit button
  
      //Performs delete method to delete the property with matching location
      axios.delete("http://localhost:8080", {data: {location: location}})
           .then(() => {alert("Home deleted") //If request was successful store display message and refresh page
                           document.location.reload();})                  
           .catch(err => {alert("Unable to delete home"); //If request was unsuccessful display error message
                          console.log(err)});  
      }
  
      
    return (
        <form onSubmit={deleteProperty}>
            <h3>Delete Property</h3>
            <label htmlFor="location">Location: </label>
            <input type="text" id="location" name="location" value={location} placeholder="Location" onChange={handleChange} required/>
            <br />
            <button>Submit</button>
        </form>
    )
 }

 export default DeleteProperty