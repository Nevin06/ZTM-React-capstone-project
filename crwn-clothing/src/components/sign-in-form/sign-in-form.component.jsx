import { useState, useContext } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields; // destructuring

    const { setCurrentUser } = useContext(UserContext);

    console.log(formFields);

    const resetFormFields = () => {
      setFormFields(defaultFormFields);
  };

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
          const { user } = await signInAuthUserWithEmailAndPassword(email, password);
          // console.log(user);
          console.log("User signed in successfully!");
          // setCurrentUser(user); // whenever user value comes back
          resetFormFields();
          // Redirect to the desired page after successful sign-in
        } catch (error) {
          switch(error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
            case 'auth/invalid-credential':
              alert('invalid email or password');
              break;
            default:
              console.log(error);
          };   
          console.log(error); 
          console.error("Error signing in:", error.message);
          // Handle error (e.g., show an error message to the user)
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value})
    };

    const signInWithGoogle = async () => {
        try {
          const { user } = await signInWithGooglePopup();
          await createUserDocumentFromAuth(user);
          console.log("User signed in with Google!");
          // setCurrentUser(user); // whenever user value comes back
          resetFormFields();
          // Redirect or handle the user's session
        } catch (error) {
          console.error("Error signing in with Google:", error.message);
        }
    };

    return (
        <div className="sign-in-container">
          <h2>Already have an account?</h2>
          <span>Sign in with your email and password</span>
            <form onSubmit={handleSignIn}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                
                <div className="buttons-container">
                  <Button type="submit">Sign In</Button>
                  <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
              </form>
        </div>
      );
};

export default SignInForm;