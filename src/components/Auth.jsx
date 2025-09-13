import {auth, provider} from "../firebase-config.js";
import { signInWithPopup} from 'firebase/auth';
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const Auth = (props) => {
    const { setIsAuth } = props
    
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider );
        try {
            setIsAuth(true);
        
            console.log(result);
            const user = result.user;
            const email = user.email;
            let atIndex = email.indexOf("@");
            let domain = email.substring(atIndex);
            if (domain == "@andrew.cmu.edu") {
                console.log("allowed domain");
            } else {
                console.log("not allowed domain");
            }
            console.log(domain);
            cookies.set("auth-token", user.refreshToken);
        } catch (err) {
            console.log(err);
        }

    };
//need to find the css he already wrote (className)
    return (
        <div className="auth"> 
            <p> Sign In With Google To Continue </p>
            <button onClick={signInWithGoogle}> Sign in with google</button>
        </div>
    ); 
    
};