import { useUserContext } from "../context/userContext";

function Inventory(props) {
    const { user } = useUserContext();
    //User ID
    const user_id = user.uid;

    document.getElementById("body").removeAttribute("class"); //Removes login backgroung image
    document.getElementById("body").setAttribute("class", "generalBackground"); //Colors the body tag

    return <div>Home Page - Inventory Page
        <img className="leftHouseImage" src={props.leftImage} alt="house" />
        <img className="rightHouseImage" src={props.rightImage} alt="house" />
    </div>
}

export default Inventory
