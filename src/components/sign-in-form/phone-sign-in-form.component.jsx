import { useState } from "react";
import { handleSendCode, handleVerifyCode } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    phoneNumber: '',
    verificationCode: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { phoneNumber, verificationCode } = formFields; // destructuring

    console.log(formFields);

      const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value})
    };

    return (
        <div className="sign-in-container">
          <h2>Already have an account?</h2>
          <span>Sign in with your phone number and verification code</span>
          <form>
            <FormInput label="Phone Number" type="text" onChange={handleChange} name="phoneNumber" value={phoneNumber} />
            <div className="buttons-container">
              <Button type='button' onClick={() => handleSendCode(phoneNumber)}>Send Verification Code</Button>
            </div>
            <FormInput label="Verification Code" type="text" onChange={handleChange} name="verificationCode" value={verificationCode} />
            <div className="buttons-container">
              <Button type='button' buttonType='google' onClick={() => handleVerifyCode(verificationCode)}>Verify Code</Button>
            </div>
          </form>
        </div>
      );
};

export default SignInForm;