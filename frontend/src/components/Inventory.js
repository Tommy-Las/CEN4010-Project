import { useUserContext } from "../context/userContext";
import React, {useState, useEffect} from "react"
import axios from "axios"
import DisplayCard from "./DisplayCard"
import { saveAs } from 'file-saver';

function Inventory(props) {
    document.getElementById("body").removeAttribute("class"); //Removes login background image
    document.getElementById("body").setAttribute("class", "generalBackground"); //Colors the body tag
    
    //User ID
    const { user } = useUserContext();
    const user_id = user.uid;

    //Stores all homes info
    const [allHomeInfo, setAllHomeInfo] = useState([]); 

    /*      GET REQUEST TO RETURN ALL HOMES IN DATABASE (ADMIN)             

        //Does get request to show all properties in the inventory
        useEffect(()=> {
            axios.get("http://localhost:8080/all")
                .then((res) => {setAllHomeInfo(res.data); }) //If request was successful store all info in allHomeInfo                              
                .catch(err => console.log(err));  //If request was unsuccessful display error message            
    }, [])     
    
    */

    //https://cen4010.herokuapp.com

    //http://localhost:8080 

    //Does get request to show all properties in the inventory for user
    useEffect(()=> {
        var data = {userID: user_id}
       
        axios.get("https://cen4010.herokuapp.com", { params: data })
        .then((res) => { setAllHomeInfo(res.data); }) //Stores data in AllHomeInfo
        .catch((error) => console.log(error)); //Logs error if found
        
    }, [])


    console.log(allHomeInfo)

    //Controls edit option   
    function toggle(id){

        setAllHomeInfo(prevCard => {
            return prevCard.map((card) => {
                return card._id === id ? {...card, editButton: !card.editButton} : card
            })
        })

    }



    //Searches through allHomeInfo array to find edited card
    function search (){
        var _id = document.getElementById("updateButton").value;

        allHomeInfo.forEach((item, index) =>{ //iterates the array
            if(item._id == _id){ 
                doWork(allHomeInfo[index]);
            }  
        })

    }


    //Performs put method to update property in the inventory
    function doWork(update){
        console.log("HEY " + update.editButton)

        axios.put("https://cen4010.herokuapp.com", {update})
        .then(() => {toggle(update._id); })    //If request was successful display success message and refresh page                                   
        .catch(err => { toggle(update._id);//If request was unsuccessful display error message
                       console.log(err)}); 

    }



    //Updates property information
    function updateProperty(event){

        event.preventDefault(); //Stops page from refreshing automatically
        search(); //Searches for modified element in array

    }



    //Performs delete request to delete a property
    function deleteProperty(id) {

        //Performs delete method to delete the property with matching id
        axios.delete("https://cen4010.herokuapp.com", {data: {"_id": id}})
             .then(() => {alert("Property deleted") //If request was successful show success message and refresh page
                             document.location.reload();})                  
             .catch(err => {alert("Unable to delete property"); //If request was unsuccessful display error message
                            console.log(err)});  
    }
    

    //Creates table rows for to display each property in inventory
    const tableInfo = (property, index) => {
        return(
            <div key ={index}>
                <DisplayCard toggle={()=>toggle(property._id)} deleteProperty={()=>deleteProperty(property._id)} setAllHomeInfo={setAllHomeInfo} 
                                                               updateProperty={updateProperty} image1={property.image1}  quantity={property.quantity}  
                                                                _id={property._id} itemType={property.itemType} description={property.description} 
                                                               estimatedCost={property.estimatedCost} editButton={property.editButton} />         
            </div>
        )
    }

    const saveInventory = () => {
        var content_obj = allHomeInfo.map((item) =>{
            return "\n\nItem: " + item.itemType + ",\nQuantity: " + item.quantity + ",\nCost: " + item.estimatedCost + ",\nDescription: " + item.description + ".\n\n"
        });
        // any kind of extension (.txt,.cpp,.cs,.bat)
        var filename = "inventory.txt";

        var blob = new Blob([content_obj], {
        type: "text/plain;charset=utf-8"
        });

        saveAs(blob, filename);
    }
    
    return (
            <div id='inventory-page'>   
                <button onClick={saveInventory} className='loginButton' id='download-button' >SAVE INVENTORY</button>
                <div id='main-container'>
                    {(allHomeInfo.length === 0) ? <div>Empty Inventory</div> : allHomeInfo.map(tableInfo)}
                </div>
                <img className="leftHouseImage" src={props.leftImage} alt="house" />
                <img className="rightHouseImage" src={props.rightImage} alt="house" />
            </div>
    )
}

export default Inventory
