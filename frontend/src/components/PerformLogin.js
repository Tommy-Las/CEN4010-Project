import { useEffect } from "react";
import signInWithEmail from "../functions/signInWithEmail";

function PerformLogin() {
  useEffect(() => {
    signInWithEmail().then(
      console.log('hello testing')
    )
  }, []);

  return <div>Verifying credentials...</div>;
}

export default PerformLogin;