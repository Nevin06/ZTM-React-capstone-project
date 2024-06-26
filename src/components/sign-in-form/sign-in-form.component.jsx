import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields; // destructuring

    console.log(formFields);

    const resetFormFields = () => {
      setFormFields(defaultFormFields);
  };

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
          await signInAuthUserWithEmailAndPassword(email, password);
          //console.log("User signed in successfully!");
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
          //console.log(error); 
          //console.error("Error signing in:", error.message);
          // Handle error (e.g., show an error message to the user)
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value});
    };

    const signInWithGoogle = async () => {
        try {
          await signInWithGooglePopup();
          //console.log("User signed in with Google!");
          resetFormFields();
          // Redirect or handle the user's session
        } catch (error) {
          //console.error("Error signing in with Google:", error.message);
        }
    };

    return (
        <SignInContainer>
          <h2>Already have an account?</h2>
          <span>Sign in with your email and password</span>
            <form onSubmit={handleSignIn}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                
                <ButtonsContainer>
                  <Button type="submit">Sign In</Button>
                  <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
              </form>
        </SignInContainer>
      );
};

export default SignInForm;