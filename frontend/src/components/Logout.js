import {getAuth, signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';



function Logout(){
    // let navigate = useNavigate()
    const auth = getAuth();
    
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('User logged out successfuly')
    }).catch((error) => {
        // An error happened.
        console.log('Cannot log user out')
    });

}

export default Logout