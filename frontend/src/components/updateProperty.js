import React, {useState} from "react"
import axios from "axios"
import { useUserContext } from "../context/userContext";

function UpdateProperty(){ 

    const { user } = useUserContext();
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


    //Does put request to update home information 
    function handleSubmit(event) {
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

        //Performs put method to update home information 
        axios.put("http://localhost:8080", {formData})
        .then(() => {alert("Home information updated") //If request was successful display success message and refresh page 
                     document.location.reload(); })             
        .catch(err => {alert("Unable to update home information"); //If request was unsuccessful display error message
                       console.log(err)});  
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
    <form onSubmit={handleSubmit}>
        <div>Update Property Form</div>
        <label htmlFor="location">Location: </label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required/>
        <br />
        <label htmlFor="propertyType">Property type: </label>
        <input type="text" id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} />
        <br />
        <label htmlFor="sqft">Sqft: </label>
        <input type="number" id="sqft" name="sqft" value={formData.sqft} onChange={handleChange} />
        <br />
        <label htmlFor="estimatedCost">Estimated cost: </label>
        <input type="number" id="estimatedCost" name="estimatedCost" value={formData.estimatedCost} onChange={handleChange} />
        <br />
        <label htmlFor="bedroomCount">Number of bedrooms: </label>
        <input type="number" id="bedroomCount" name="bedroomCount" value={formData.bedroomCount} onChange={handleChange} />
        <br />
        <label htmlFor="bathRoomCount">Number of bathrooms: </label>
        <input type="number" id="bathRoomCount" name="bathRoomCount" value={formData.bathRoomCount} onChange={handleChange} />
        <br />
        <label htmlFor="units">Number of units (if applicable): </label>
        <input type="number" class="formInput" id="units" name="units" value={formData.units} onChange={handleChange} />
        <br />
        <label htmlFor="other">Other details: </label>
        <textarea id="other" name="other" value={formData.other} onChange={handleChange}></textarea>
        <br />
            <input type="file" id="image1" name="image1" alt="house image #1" accept="image/*" onChange={handleChange} />
            <input type="file" id="image2" name="image2" alt="house image #2" accept="image/*" onChange={handleChange} />
            <input type="file" id="image3" name="image3" alt="house image 31" accept="image/*" onChange={handleChange} />
            <br />        
        <br />
        <button>Submit</button>
    </form>
    )
 }

 export default UpdateProperty