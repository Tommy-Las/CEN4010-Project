import React, {useState} from "react"
import axios from "axios"

function UpdateProperty(){ 

   //Stores submitted data 
   const [formData, setFormData] = useState({ location: "",
                                              sqft: "",
                                              bedroomCount: "",
                                              bathRoomCount: "",
                                              other: ""           });

    //Updates the state formData
    function handleChange (event) {
        const {name, value} = event.target;

        setFormData((prevData) => {
        return({...prevData, [name]: value})  });
    }


    //Does put request to update home information 
    function handleSubmit(event) {
        event.preventDefault(); //Stops the page from refreshing after pressing the submit button

        //Performs put method to update home information 
        axios.put("http://localhost:8080", {formData})
        .then(() => {alert("Home information updated") //If request was successful display success message and refresh page 
                     document.location.reload(); })             
        .catch(err => {alert("Unable to update home information"); //If request was unsuccessful display error message
                       console.log(err)});  
    }


    return (
    <form onSubmit={handleSubmit}>
        <div>Update Property Form</div>
        <label htmlFor="location">Location: </label>
        <input type="text" id="location" name="location" value={formData.location} placeholder="Location" onChange={handleChange} required/>
        <br />
        <label htmlFor="sqft">Sqft: </label>
        <input type="text" id="sqft" name="sqft" value={formData.sqft} placeholder="Ssqft" onChange={handleChange} />
        <br />
        <label htmlFor="bedroomCount">Number of bedrooms: </label>
        <input type="text" id="bedroomCount" name="bedroomCount" value={formData.bedroomCount} placeholder="# of bedrooms" onChange={handleChange} />
        <br />
        <label htmlFor="bathRoomCount">Number of bathrooms: </label>
        <input type="text" id="bathRoomCount" name="bathRoomCount" value={formData.bathRoomCount} placeholder="# of bathrooms" onChange={handleChange} />
        <br />
        <label htmlFor="other">Other details: </label>
        <textarea id="other" name="other" value={formData.other} placeholder="Other details" onChange={handleChange}></textarea>
        <br />
        <button>Submit</button>
    </form>
    )
 }

 export default UpdateProperty