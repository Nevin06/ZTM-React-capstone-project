import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const firebaseConfig = {
    // my firebase config
  };

  const firebaseApp = initializeApp(firebaseConfig);

  export const auth = getAuth(firebaseApp);

  let globalConfirmationResult = null;
  export const handleSendCode = async (phoneNumber) => {
    console.log('Entered handleSendCode inside firebase.utils');
    console.log(phoneNumber);
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      size: 'invisible', // Use invisible reCAPTCHA
      callback: async (response) => {
        console.log('Entered callback inside handleSendCode');
        // reCAPTCHA solved, allow signInWithPhoneNumber
        // Send verification code to the user's phone
        const phoneNumberWithCountryCode = `+1${phoneNumber}`; // Modify as needed
        await signInWithPhoneNumber(phoneNumberWithCountryCode, recaptchaVerifier)
          .then((confirmationResult) => {
            // Prompt user to enter the verification code
            // Set the confirmation result for later use
            alert('Enter verification code');
            globalConfirmationResult = confirmationResult;
          })
          .catch((error) => {
            console.error('Error sending verification code:', error);
          });
      },
    });

    // Render the reCAPTCHA widget
    recaptchaVerifier.render();
  };

  export const handleVerifyCode = async (verificationCode) => {
    // Verify the code entered by the user
    await globalConfirmationResult.confirm(verificationCode)
    .then((userCredential) => {
    // User successfully signed in
    const user = userCredential.user;
    console.log('User signed in:', user);
    // You can redirect the user to the app's main page or perform other actions
  })
  .catch((error) => {
    // Code verification failed
    console.error('Error verifying code:', error);
    // Handle the error (e.g., show an error message to the user)
  });
  };