import { getAuth, sendSignInLinkToEmail } from "firebase/auth";



function sendEmail(email) {
    return new Promise((res, rej)=>{

        const auth = getAuth();
        
        const actionCodeSettings = {
            url: 'http://localhost:3000/verify',
            handleCodeInApp: true,
        }

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                res('Email succesfully sent, check your email to login.')
                //clear input values
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                res('Email was not sent, try again later.')
                console.log(errorCode)
            });
    })

}

export default sendEmail