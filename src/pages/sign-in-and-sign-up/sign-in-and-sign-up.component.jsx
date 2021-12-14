import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component.jsx';
import SignUp from '../../components/sign-up/sign-up.component';
import './sign-in-and-sign-up.styles.css';

const SignInAndSignUpPage = () => (
    <div className="signin-and-signup">
        <SignIn />
        <SignUp />
    </div>
);

export default SignInAndSignUpPage;