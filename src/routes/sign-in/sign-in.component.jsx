import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'


const SignIn = () => {
    useEffect( () => {
        const fnGetRedurectResults = async  () => {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response){
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        };
        fnGetRedurectResults();
        
    },[] );
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

    }

    return(
        <div>
            <h1> Sign-In page</h1>
            <button onClick={logGoogleUser}> Sign in with Google Popup</button>
            <SignUpForm></SignUpForm>
        </div>
    );
};

export default SignIn;

