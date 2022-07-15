import React, {useState} from "react" 
import axios from "axios"

function AddProperty() {

    //Stores form data
    const [formData, setformData] = useState({ location: "",
                                               sqft: "",
                                               bedroomCount: "",
                                               bathRoomCount: "",
                                               other: ""  });
    //Updates the state formData
    function handleChange (event) {
        const {name, value} = event.target;

        setformData((prevData) => {
        return({...prevData, [name]: value})  });
    }

    //Does post request after submitting the form
    function handleSubmit (event) {
        event.preventDefault(); //Stops the page from refreshing after pressing the submit button

        //Performs post method to add a new home to the database
        axios.post("http://localhost:8080/", {formData})
        .then(() => { alert("Home added."); //If request was successful show good alert and refresh page 
                      document.location.reload(); }) 
        .catch(() => alert("Error: Home not added."));  //If request was unsuccessful show bad alert
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div>Add Property Form</div>
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

export default AddProperty