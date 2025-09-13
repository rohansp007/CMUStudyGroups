import {auth, provider} from "../firebase-config.js";
import { signInWithPopup} from 'firebase/auth';
//import {useCookies} from "react-cookie";
//to add-- cookies

//const cookies = new Cookies();
export const Auth = () => {
    //const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider );
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
        //setCookie("auth-token", result.user.refreshToken, {path: "/"});


    };
//need to find the css he already wrote (className)
    return (
        <div className="auth"> 
            <p> Sign In With Google To Continue </p>
            <button onClick={signInWithGoogle}> Sign in with google</button>
        </div>
    ); 
    
};