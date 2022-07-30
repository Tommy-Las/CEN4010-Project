import React, {useState} from "react"
import axios from "axios"
import { useUserContext } from "../context/userContext";

function User(props){ 

    //Stores user ID
    const {user} = useUserContext();
    const user_id = user.id;

    //Stores form data
    const [formData, setFormData] = useState({ userID: user_id, 
                                               name: "",
                                               email: "",
                                               phoneNumber: "",
                                               address: "",
                                               authorizedUsers: "" })

                                               
    //Does post request after submitting the form
    function handleSubmit (event) {
        
        event.preventDefault(); //Stops the page from refreshing after pressing the submit button

        //Performs post method to add a new home to the database
        axios.post("https://cen4010.herokuapp.com", {formData})
        .then(() => { alert("Success: Home added."); //If request was successful show good alert and refresh page 
                      document.location.reload(); }) 
        .catch(() => {alert("Error: Total image size exceeds 75KB ");
                      document.location.reload();});  //If request was unsuccessful show error message 
        
    } 


    //Stores entered information from form in data
    function handleChange(e) {
        setFormData(prevFormData => {
            return { ...prevFormData, [e.target.name]: e.target.value }
        })
        
    }
    return <div>
        <form className="form" onSubmit={handleSubmit}>
            <h3 className="center title">Profile</h3>
            <label htmlFor="name">Name: </label>
            <input type="text" className="formInput" name="name" id="name" value={formData.name} onChange={handleChange} />
            <br />
            <label htmlFor="email">Email: </label>
            <input type="email" className="formInput" name="email" id="email" value={formData.email} onChange={handleChange}/>
            <br />
            <label htmlFor="phoneNumber">Phone number: </label>
            <input type="tel" className="formInput" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
            <br />
            <label htmlFor="address">Permanent address: </label>
            <input type="text" className="formInput" name="address" id="address" value={formData.address} onChange={handleChange}/>
            <br />
            <label htmlFor="authorizedUsers">Authorized Users: </label>
            <input type="text" className="formInput" name="authorizedUsers" id="authorizedUsers" value={formData.authorizedUsers} onChange={handleChange}/>
            <button id="profileButton">Save</button>
        </form>
        <img className="leftHouseImage" src={props.leftImage} alt="house" />
        <img className="rightHouseImage" src={props.rightImage} alt="house" />
    </div>
 }

 export default User