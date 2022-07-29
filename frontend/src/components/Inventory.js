import { useUserContext } from "../context/userContext";
import React, {useState, useEffect} from "react"
import axios from "axios"
import DisplayCard from "./DisplayCard"

function Inventory(props) {
    document.getElementById("body").removeAttribute("class"); //Removes login backgroung image
    document.getElementById("body").setAttribute("class", "generalBackground"); //Colors the body tag
    
    //User ID
    const { user } = useUserContext();
    const user_id = user.uid;

    console.log(user_id);

    //Stores all homes info
    const [allHomeInfo, setAllHomeInfo] = useState([{ userID: user_id,
                                                      _id: "",
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
                                                      image3: "",
                                                      editButton: true   }]); 

    const [update, setUpdate] = useState({ userID: user_id,
                                            _id: "",
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
                                            image3: "",
                                            editButton: true   });                                                 
    

         //Does get request once
        useEffect(()=> {
            axios.get("http://localhost:8080/all")
                .then((res) => {setAllHomeInfo(res.data); }) //If request was successful store all info in allHomeInfo                              
                .catch(err => console.log(err));  //If request was unsuccessful display error message            
        }, [])

          console.log(allHomeInfo)


    function toggle(id){
        setAllHomeInfo(prevCard => {
            return prevCard.map((card) => {
                return card._id === id ? {...card, editButton: !card.editButton} : card
            })
        })
    }

    function search (){
        var _id = document.getElementById("updateButton").value;
        allHomeInfo.forEach((item, index) =>{
            if(item._id == _id){
                setUpdate(allHomeInfo[index])
            }  
        })
        console.log('UPDATE ' + JSON.stringify(update))

    }

    function updateProperty(event){
        
        //Performs put method to update home information 
        event.preventDefault();

        search();

         axios.put("http://localhost:8080", {update})
        .then(() => {alert("Home information updated"); //If request was successful display success message and refresh page 
                      })             
        .catch(err => {alert("Unable to update home information"); //If request was unsuccessful display error message
                       console.log(err)});  
        
        toggle(update.id);

    }

    //Does delete request to delete a property
    function deleteProperty() {
        var _id = document.getElementById("deleteButton").value;

        //Performs delete method to delete the property with matching location
        axios.delete("http://localhost:8080", {data: {"_id": _id}})
             .then(() => {alert("Property deleted") //If request was successful store display message and refresh page
                             document.location.reload();})                  
             .catch(err => {alert("Unable to delete property"); //If request was unsuccessful display error message
                            console.log(err)});  
        }
    


    //Creates table rows for display
    const tableInfo = (property, index) => {
        return(
            <tr key ={index}>
                <DisplayCard toggle={()=>toggle(property._id)} deleteProperty={deleteProperty} setAllHomeInfo={setAllHomeInfo} updateProperty={updateProperty} setUpdate={setUpdate} image1={property.image1} image2={property.image2} image3={property.image3} 
                                                _id={property._id} location={property.location} propertyType={property.propertyType} sqft={property.sqft} bedroomCount={property.bedroomCount} 
                                                bathRoomCount={property.bathRoomCount} units={property.units} estimatedCost={property.estimatedCost} other={property.other} editButton={property.editButton} />         
            </tr>
        )
    }
    
    return (
        <div>        
            {/*Table*/}
            <table>
                <tbody>
                    {allHomeInfo.length === 0 ? <div>Empty Inventory</div> : allHomeInfo.map(tableInfo)}
                </tbody>
            </table>
        <img className="leftHouseImage" src={props.leftImage} alt="house" />
        <img className="rightHouseImage" src={props.rightImage} alt="house" />
        </div>
    )
}
export default Inventory
