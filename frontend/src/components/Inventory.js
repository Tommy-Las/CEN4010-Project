function Inventory(props) {
    document.getElementById("body").removeAttribute("class"); //Removes login backgroung image
    document.getElementById("body").setAttribute("class", "generalBackground"); //Colors the body tag

    return <div>Home Page - Inventory Page
        <img class="leftHouseImage" src={props.leftImage} alt="house" />
        <img class="rightHouseImage" src={props.rightImage} alt="house" />
    </div>
}

export default Inventory
