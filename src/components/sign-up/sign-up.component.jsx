import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import './sign-up.styles.css';

const SignUp = () => {
    const [userDetails, setUserDetails] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = event => {
        const { value, name } = event.target;
        setUserDetails({ ...userDetails, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const {displayName, password, email, confirmPassword} = userDetails;
        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            
            await createUserProfileDocument(user, { displayName });
            setUserDetails({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className='sign-up'>
            <h2 className='signup-title'>I do no have an account</h2>
            <span>Sign up with you email and password</span>
            <form className='sign-up-form'>
                <FormInput
                    type='text'
                    name='displayName'
                    value={userDetails.displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={userDetails.email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={userDetails.password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={userDetails.confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit' onClick={handleSubmit}>Sign Up</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;