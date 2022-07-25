import React, {useState} from "react"

function User(props){ 

    //Stores form data
    const [formData, setFormData] = useState({ name: "",
                                               email: "",
                                               phoneNumber: "",
                                               address: "",
                                               authorizedUsers: "" })

    return <div>
        <form class="form">
            <h3 class="center title">Profile</h3>
            <label htmlfor="name">Name: </label>
            <input type="text" class="formInput" name="name" />
            <br />
            <label htmlfor="email">Email: </label>
            <input type="email" class="formInput" name="email" />
            <br />
            <label htmlfor="phoneNumber">Phone number: </label>
            <input type="tel" class="formInput" name="phoneNumber"/>
            <br />
            <label htmlfor="address">Permanent address: </label>
            <input type="text" class="formInput" name="address"/>
            <br />
            <label htmlfor="authorizedUsers">Authorized Users: </label>
            <input type="text" class="formInput" name="authorizedUsers"/>
            <button id="profileButton">Submit</button>
        </form>
        <img class="leftHouseImage" src={props.leftImage} alt="house" />
        <img class="rightHouseImage" src={props.rightImage} alt="house" />
    </div>
 }

 export default User