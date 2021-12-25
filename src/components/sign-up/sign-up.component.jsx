import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import './sign-up.styles.css';

const SignUp = () => {
    const dispatch = useDispatch();
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
        dispatch(signUpStart({email, password, displayName}));
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