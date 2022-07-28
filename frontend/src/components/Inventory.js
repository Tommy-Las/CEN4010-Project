import { useUserContext } from "../context/userContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Inventory(props) {
    const { user } = useUserContext();
    //User ID
    const user_id = user.uid;

    const [allHomes, setAllHomes] = useState([])



    useEffect(() => { 
        // axios.get('http://localhost:8080/all/' + user_id).then((res) => { 
        //     console.log(res.data)
        //     var property_array = res.data.map((property) =>{
        //         return(<div>
        //             <p>
        //                 <Link to={'/property' + property.id}></Link>
        //             </p>
        //         </div>)
        //     })
        //     setAllHomes(property_array)
        // }
        // )
        
     }, [])

    document.getElementById("body").removeAttribute("class"); //Removes login backgroung image
    document.getElementById("body").setAttribute("class", "generalBackground"); //Colors the body tag


    return <div>Home Page - Inventory Page
        <div>{allHomes}</div>
        <img className="leftHouseImage" src={props.leftImage} alt="house" />
        <img className="rightHouseImage" src={props.rightImage} alt="house" />
    </div>
}

export default Inventory
