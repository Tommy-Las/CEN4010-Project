import { getAuth } from "firebase/auth";

function sendEmail(email) {
    const auth = getAuth();

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user.
            setMessage('Email succesfully sent, check your email to login.')
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email);
            //clear input values
            setEmail('')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            setMessage('Email was not sent, try again later.')
        });

}

export default sendEmail