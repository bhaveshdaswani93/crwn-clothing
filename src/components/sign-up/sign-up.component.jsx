import React,{useState} from 'react'

import './sign-up.styles.scss'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth,createUserProfileDocument } from '../../firebase/firebase.utils'

const SignUp = () => {
    const [formInput,setFormInput] = useState({
        displayName:'',
        email:"",
        password:"",
        confirmPassword:""
    });

    const handleSubmit = async e => {
        e.preventDefault();

        let {displayName,email,password,confirmPassword} = formInput;

        if(password !== confirmPassword) {
            alert('Password and confirm password do not match.');
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});
            setFormInput({
                displayName:'',
                email:"",
                password:"",
                confirmPassword:""
            })
        } catch(error) {
            console.error(error);
        }
    
    }

    const handleChange = e => {
        setFormInput(oldInputs=>{
            let {name,value} = e.target
            let newInput = {...oldInputs};
            newInput[name]=value;
            return newInput;
          })
    }

    let {displayName,email,password,confirmPassword} = formInput;

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} className='sign-up-form'>
                <FormInput 
                    type='text' 
                    name='displayName' 
                    label='Display Name' 
                    handleChange={handleChange} 
                    required 
                    value={displayName}
                />
                <FormInput 
                    type='email' 
                    name='email' 
                    label='Email' 
                    handleChange={handleChange} 
                    required 
                    value={email}
                />
                <FormInput 
                    type='password' 
                    name='password' 
                    label='Password' 
                    handleChange={handleChange} 
                    required 
                    value={password}
                />
                <FormInput 
                    type='password' 
                    name='confirmPassword' 
                    label='Confirm Password' 
                    handleChange={handleChange} 
                    required 
                    value={confirmPassword}
                />
                <CustomButton> SIGN UP </CustomButton>
            </form>
        </div>
    );
}

export default SignUp;