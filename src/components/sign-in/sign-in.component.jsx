import React, {useState} from 'react'

import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth,signInWithGoogle} from '../../firebase/firebase.utils'



const SignIn = props => {

    const [formState,setFormState] = useState({
        email:'',
        password:''
    }) 
    
    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const {email,password} = formState;
            await auth.signInWithEmailAndPassword(email,password);
            setFormState({
                email:'',
                password:''
            })
        } catch(error) {
            console.error(error);
        }
        

    }

    const handleChange = e => {
        setFormState(oldValue=>{
            // console.log(e);
            const newValue = {...oldValue}
            newValue[e.target.name] = e.target.value;
            return newValue;
        })
    }

    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span>Sign with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type='email' label='Email' value={formState.email} handleChange={handleChange} name='email' required />
                
                <FormInput type='password' label='Password' value={formState.password} name='password' onChange={handleChange} />
                <div className='buttons'>
                    <CustomButton type='submit'>Submit Now</CustomButton>
                    <CustomButton isGoogleSignIn onClick={signInWithGoogle} >Sign In With Google</CustomButton>
                </div>
                
            </form>
        </div>
    );
}

export default SignIn;