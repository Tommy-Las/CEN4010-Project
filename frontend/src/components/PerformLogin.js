import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import signInWithEmail from "../functions/signInWithEmail";



function PerformLogin() {
  const navigate = useNavigate()
  const [user_first_time, setUserFirstTime] = useState('')
  
  

  useEffect(() => {
    signInWithEmail().then((first_time)=>{
      console.log(first_time)
      if(first_time){
        navigate('/confirm')
      }
    })
   })
  

  return <div>Verifying credentials...</div>;
}

export default PerformLogin;