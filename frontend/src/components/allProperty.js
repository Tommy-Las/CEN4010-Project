import React, {useState, useEffect} from "react"
import axios from "axios"

function AllProperty(){
    const { user } = useUserContext();
    //User ID
    const user_id = user.uid; 

    const [allHomeInfo, setAllHomeInfo] = useState({}); //Stores all homes info

    //Does get request once
    useEffect(()=> {
        axios.get("http://localhost:8080/all")
            .then((res) => setAllHomeInfo(res.data)) //If request was successful store all info in allHomeInfo                              
            .catch(err => console.log(err));  //If request was unsuccessful display error message            
    }, [])
    
  return (
          <h3>Gets all Property in Database</h3>
  )
 }

 export default AllProperty