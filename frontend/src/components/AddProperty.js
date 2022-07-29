import React, {useState} from "react" 
import axios from "axios"
import FileBase64 from "react-file-base64"
import { useUserContext } from "../context/userContext";

function AddProperty(props) {

    //User ID
    const { user } = useUserContext();
    const user_id = user.uid;
 
    //Stores form data
    const [formData, setFormData] = useState({ userID: user_id,
                                               _id: "",
                                               itemType: "",
                                               estimatedCost: "",
                                               description: "" ,
                                               image1:"",
                                               image2: "",
                                               image3: "",
                                               editButton: true          });

    //Updates the state formData 
    function handleChange (event) {

        const {name, value} = event.target;
        setFormData((prevData) => { return({...prevData, [name]: value})  });
  
    }


    //Does post request after submitting the form
    function handleSubmit (event) {

        event.preventDefault(); //Stops the page from refreshing after pressing the submit button

        //Performs post method to add a new home to the database
        axios.post("http://localhost:8080/", {formData})
        .then(() => { alert("Success: Home added."); //If request was successful show good alert and refresh page 
                      document.location.reload(); }) 
        .catch(() => {alert("Error: Total image size exceeds 75KB ");
                      document.location.reload();});  //If request was unsuccessful show error message 
        
    }
  

    return ( 
      <div>
          <form onSubmit={handleSubmit} className="form">
            <h3 className="center title">Add to Inventory</h3>
            <label htmlFor="itemType">Type of item: </label>
            <input type="text" className="formInput" id="itemType" name="itemType" value={formData.itemType} onChange={handleChange} required/>
            <br />
            <label htmlFor="estimatedCost">Estimated cost: </label>
            <input type="text" className="formInput" id="estimatedCost" name="estimatedCost" value={formData.estimatedCost} onChange={handleChange} />
            <br />
            <label htmlFor="description">Description: </label>
            <textarea className="formInput" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
            <br />
            <FileBase64 multiple={false} onDone = {(base64)=>{setFormData(prevFormData => {return { ...prevFormData, image1: base64} })}} />
            <FileBase64 multiple={false} onDone = {(base64)=>{setFormData(prevFormData => {return { ...prevFormData, image2: base64} })}} />
            <FileBase64 multiple={false} onDone = {(base64)=>{setFormData(prevFormData => {return { ...prevFormData, image3: base64} })}} />
            <br />
            <button id="addPropertyButton">Submit</button>
        </form>
        <img className="leftHouseImage" src={props.leftImage} alt="house" />
        <img className="rightHouseImage" src={props.rightImage} alt="house" />
      </div>

       
    )
}

export default AddProperty