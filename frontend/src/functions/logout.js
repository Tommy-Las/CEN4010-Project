import {getAuth, signOut} from 'firebase/auth'
import { useUserContext } from '../context/userContext';

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