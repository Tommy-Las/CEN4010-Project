import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import signInWithEmail from "../functions/signInWithEmail";



function PerformLogin() {
  document.getElementById("body").removeAttribute("class"); //Removes login backgroung image
  
  const navigate = useNavigate()
  const [user_first_time, setUserFirstTime] = useState('')
  
  

  useEffect(() => {
    signInWithEmail().then((first_time)=>{
      if(first_time){
        console.log
        navigate('/confirm')
      }
      else{
        navigate('/')
      }
      
    })
   })
  

  return <div>Verifying credentials...</div>;
}

export default PerformLogin;