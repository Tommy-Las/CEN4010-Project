import React, {useState} from "react" 
import axios from "axios"
import { useUserContext } from "../context/userContext";

function AddProperty(props) {

    const { user } = useUserContext();
    //User ID
    const user_id = user.uid;
    console.log(user_id);
    
    //Stores form data
    const [formData, setFormData] = useState({ userID: user_id,
                                               propertyID: "",
                                               location: "",
                                               propertyType: "",
                                               sqft: "",
                                               bedroomCount: "",
                                               bathRoomCount: "",
                                               units: "",
                                               estimatedCost: "",
                                               other: "" ,
                                               image1:"",
                                               image2: "",
                                               image3: ""   });
    //Updates the state formData 
    function handleChange (event) {
        const {name, value, files} = event.target;

        if(name === "image1"){ 
          setFormData((prevData) => {
            return {...prevData, [name]: files[0]}
          })
        }
        else if(name === "image2"){
          setFormData((prevData) => {
            return {...prevData, [name]: files[0]}
          })
        }
        else if(name === "image3"){
          setFormData((prevData) => {
            return {...prevData, [name]: files[0]}
          })
        }
        else{
          setFormData((prevData) => {
          return({...prevData, [name]: value})  });
        }
    }

    //Does post request after submitting the form
    function handleSubmit (event) {
        event.preventDefault(); //Stops the page from refreshing after pressing the submit button

        //Renders images url
        if(formData.image1 !== ""){
          renderFile(formData.image1, 1)
        }
        if(formData.image2 !== ""){
          renderFile(formData.image2, 2)
          console.log('2')
        }
        if(formData.image3 !== ""){
          renderFile(formData.image3, 3)
        }

        //Performs post method to add a new home to the database
        axios.post("http://localhost:8080/", {formData})
        .then(() => { alert("Home added."); //If request was successful show good alert and refresh page 
                      document.location.reload(); }) 
        .catch(() => alert("Error: Home not added."));  //If request was unsuccessful show bad alert
    }

    //Render images to display on screen
    function renderFile(image, num){
      const name = 'image' + num;
    
      if(image){
        const reader = new FileReader();
        reader.onloadend = () =>{
          setFormData((prevData) =>{
            return {...prevData, [name]: reader.result}
          });
        }
        reader.readAsDataURL(image);
      }
    }


    return ( 
      <div>
          <form onSubmit={handleSubmit} className="form">
            <h3 className="center title">Add Your Property</h3>
            <label htmlFor="location">Location: </label>
            <input type="text" className="formInput" id="location" name="location" value={formData.location} onChange={handleChange} required/>
            <br />
            <label htmlFor="propertyType">Property type: </label>
            <input type="text" className="formInput" id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} />
            <br />
            <label htmlFor="sqft">Sqft: </label>
            <input type="number" className="formInput" id="sqft" name="sqft" value={formData.sqft} onChange={handleChange} />
            <br />
            <label htmlFor="estimatedCost">Estimated cost: </label>
            <input type="number" className="formInput" id="estimatedCost" name="estimatedCost" value={formData.estimatedCost} onChange={handleChange} />
            <br />
            <label htmlFor="bedroomCount">Number of bedrooms: </label>
            <input type="number" className="formInput" id="bedroomCount" name="bedroomCount" value={formData.bedroomCount} onChange={handleChange} />
            <br />
            <label htmlFor="bathRoomCount">Number of bathrooms: </label>
            <input type="number" className="formInput" id="bathRoomCount" name="bathRoomCount" value={formData.bathRoomCount} onChange={handleChange} />
            <br />
            <label htmlFor="units">Number of units (if applicable): </label>
            <input type="number" className="formInput" id="units" name="units" value={formData.units} onChange={handleChange} />
            <br />
            <textarea placeholder='Other details' className="formInput" id="other" name="other" value={formData.other} onChange={handleChange}></textarea>
            <br />
            <input type="file" id="image1" name="image1" alt="house image #1" accept="image/*" onChange={handleChange} />
            <input type="file" id="image2" name="image2" alt="house image #2" accept="image/*" onChange={handleChange} />
            <input type="file" id="image3" name="image3" alt="house image 31" accept="image/*" onChange={handleChange} />
            <br />
            <button id="addPropertyButton">Submit</button>
        </form>
        <img className="leftHouseImage" src={props.leftImage} alt="house" />
        <img className="rightHouseImage" src={props.rightImage} alt="house" />
      </div>

       
    )
}

export default AddProperty