import { useState } from "react";
import { useUserContext } from "../context/userContext";

function User(props){ 
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [address, setAddress] = useState('')

    const { user } = useUserContext();
    //User ID
    const user_id = user.uid;

    const handleSubmit = (e) => {
        //prevent default submission
        e.preventDefault()
        
    }

    return (<>
    <form onSubmit={handleSubmit}> 
        <label >Full Name:</label>
        <input  placeholder='First Name' id="nameInput" value={first_name} onChange={(e) => setFirstName(e.target.value)}></input>
        <input  placeholder='Last Name'id="nameInput" value={last_name} onChange={(e) => setLastName(e.target.value)}></input>
        <label >Address:</label>
        <input  id="addressInput" value={address} onChange={(e) => setAddress(e.target.value)}></input>
        <button id="submitButton">Submit</button>
    </form>
        <img class="leftHouseImage" src={props.leftImage} alt="house" />
        <img class="rightHouseImage" src={props.rightImage} alt="house" />
        </>
    )
        
 }

 export default User