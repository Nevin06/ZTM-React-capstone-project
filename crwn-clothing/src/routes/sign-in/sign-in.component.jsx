import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    useEffect(() => {
        async function fetchData() {
            const response = await getRedirectResult(auth);
            // console.log(response);
            if (response){
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        };
        fetchData();
    }, []);
    const logGoogleUser = async () => {
        // const response = await signInWithGooglePopup();
        // console.log(response);
        // createUserDocumentFromAuth(response);
        const { user } = await signInWithGooglePopup(); // destructure response's user object
        // console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     console.log({user});
    // };

    return (
        <div>
            <h1>SignIn page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
        </div>
    );
};

export default SignIn;