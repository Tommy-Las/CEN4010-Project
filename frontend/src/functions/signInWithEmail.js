import {isSignInWithEmailLink, signInWithEmailLink, getAuth} from 'firebase/auth'

function signInWithEmail(){
    const auth = getAuth()
    
    return new Promise((res,rej) => { 
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem('emailForSignIn')

        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');
            // You can access the new user via result.user
            console.log('User was logged in successfully')
            res('logged in')
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            let err = error.code
            console.log(err)
          });
    }
     })
    
}

export default signInWithEmail