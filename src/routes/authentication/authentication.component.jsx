import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'

import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'


const Authentication = () => {
    useEffect( () => {
        const fnGetRedurectResults = async  () => {
            const response = await getRedirectResult(auth);
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
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
};

export default Authentication;

