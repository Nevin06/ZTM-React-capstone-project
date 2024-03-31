import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        // const response = await signInWithGooglePopup();
        // console.log(response);
        // createUserDocumentFromAuth(response);
        const { user } = await signInWithGooglePopup(); // destructure response's user object
        // console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>SignIn page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    );
};

export default SignIn;