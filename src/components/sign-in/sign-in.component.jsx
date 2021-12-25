import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import './sign-in.styles.css';

const SignIn = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({email: '', password: ''});

    const handleChange = event => {
        const {value, name} = event.target;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = formData;
        dispatch(emailSignInStart({email, password}));
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
                        <CustomButton isGoogleSignIn onClick={() => dispatch(googleSignInStart())} type='button'> Sign In with Google </CustomButton>
                    </div>
                </form>
            </div>
    );
}

export default SignIn;