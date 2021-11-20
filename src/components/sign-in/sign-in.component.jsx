import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import {auth, signInWithGoogle} from '../../firebase/firebase.utils';
import './sign-in.styles.css';

const SignIn = () => {
    const [formData, setFormData] = useState({email: '', password: ''});

    const handleChange = event => {
        const {value, name} = event.target;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = event => {
        event.preventDefault();
    }
    return(
            <div className="sign-in">
                <h2 className="signin-title">I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={formData.email}
                        handleChange={handleChange}
                        label='Email'
                        required
                    />
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={formData.password}
                        handleChange={handleChange}
                        label='Password'
                        required
                    />
                    <div className="signin-button">
                        <CustomButton type='submit'> Sign In </CustomButton>
                        <CustomButton type='button'> Sign In with Google </CustomButton>
                    </div>
                </form>
            </div>
    );
}

export default SignIn;