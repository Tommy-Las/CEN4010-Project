import React, {useState} from "react"
import axios from "axios"

function Property(){ 
    const { user } = useUserContext();
    //User ID
    const user_id = user.uid;
    
    const [location, setLocation] = useState(""); //Stores submitted location 
    const [homeInfo, setHomeInfo] = useState({}); //Stores home information
  
  
    //Update location state 
    function handleChange(event) {
      const {value} = event.target;
      setLocation(value);
    }
  
  
    //Does get request to find home with matching location
    function search(event) {
      event.preventDefault(); //Stops the page from refreshing after pressing the submit button
  
      //Performs get method to find home(s) with matching location
      axios.get("http://localhost:8080", {params: location})
           .then((res) => setHomeInfo(res.data)) //If request was successful store data found in homeInfo                   
           .catch(err => {alert("No homes found"); //If request was unsuccessful display error message
                          console.log(err)});  
      }
  
      
    return (
        <form onSubmit={search}>
            <h3>Single Property Information</h3>
            <label htmlFor="location">Location: </label>
            <input type="text" id="location" name="location" value={location} placeholder="Location" onChange={handleChange} required/>
            <br />
            <button>Search</button>
        </form>
    )
}

export default Property