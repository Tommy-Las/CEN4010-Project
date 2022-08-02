import React, {useState, useEffect} from "react"
import { useUserContext } from "../context/userContext";
import axios from "axios"
import ProfileCard from "./ProfileCard"
import ProfileEditCard from "./ProfileEditCard"

function User(props){ 

    //Variables & states
    const { user } = useUserContext();
    const user_id = user.uid;
    const [isProfileReturned, setIsProfileReturned] = useState(false);
    const [editButton, setEditButton] = useState(true);
    const [profileData, setProfileData] = useState({ _id: "",
                                                     userID: user_id, 
                                                     name: "",
                                                     email: "",
                                                     phoneNumber: "",
                                                     address: "",
                                                     authorizedUsers: ""  })


    //Does get request to display profile
    useEffect(()=> {
        var data = {userID: user_id}
        axios.get("https://cen4010.herokuapp.com/profile", { params: data })
        .then((res) => { if(res.data.length !== 0){
                             setProfileData(res.data[0]);
                             setIsProfileReturned(true);
                             
                            }}) //Stores data in AllHomeInfo
        .catch((error) => console.log(error)); //Logs error if found
    }, [])


     //Controls edit option   
    function toggle(){
        setEditButton(prevData => {  return (!prevData) })
    }

                     
    //Handles the action for when the button is clicked
    function handleSubmit (event) {

        event.preventDefault(); //Stops the page from refreshing after pressing the submit button
        if(isProfileReturned === true){ //Update profile if it was already created

        axios.put("https://cen4010.herokuapp.com/profile", {profileData})
            .then(() => {toggle(); })    //If successful                               
            .catch(err => { alert("Unable to update. Please try again."); //If request was unsuccessful display error message
                            toggle();
                            console.log(err)}); 
        }
        else{ //Create a new profile if none exist
            axios.post("https://cen4010.herokuapp.com/profile", {profileData})
            .then(() => { setIsProfileReturned(true); //If successful  
                          toggle(); 
                        }) 
            .catch(() => {alert("Please try again"); //If request was unsuccessful show error message 
                          document.location.reload();}); 
        }
        
    } 

    //Stores entered information
    function handleChange(e) {
        setProfileData(prevData => {
            return { ...prevData, [e.target.name]: e.target.value }
        })
        
    }

    return (
        <div>
            {editButton === true ?
                    <ProfileCard toggle={toggle} userID={profileData.userID} name={profileData.name} email={profileData.email} 
                                phoneNumber={profileData.phoneNumber} address={profileData.address} authorizedUsers={profileData.authorizedUsers} />             
                    :          
                    <ProfileEditCard handleSubmit={handleSubmit} handleChange={handleChange} userID={profileData.userID} name={profileData.name} email={profileData.email} 
                    phoneNumber={profileData.phoneNumber} address={profileData.address} authorizedUsers={profileData.authorizedUsers} />
            }

            <img className="leftHouseImage" src={props.leftImage} alt="house" />
            <img className="rightHouseImage" src={props.rightImage} alt="house" />
        </div>
    )
 }

 export default User