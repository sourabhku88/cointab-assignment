import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

let url = 'localhost:3002/login';

const Login = ({setUserData}) => {
    const [inputData, setInputData] = useState({ email: '', password: '' });
    const  navigate = useNavigate()
    

    const inputHendler = e => setInputData({ ...inputData, [e.target.name]: e.target.value });

    const submit = async e => {
        e.preventDefault()
        console.log(inputData);
        try {
            const  { data } = await axios.post(`http://localhost:3002/login`,inputData);
            alert(data.message);
            setUserData(data.data);
            localStorage.setItem('token',data.token);
            localStorage.setItem('data',JSON.stringify(data.data));
            setInputData({ email: '', password: '' });
            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
       }
    }
    return (
        <>
            <div className="login d-flex justify-content-center align-items-center">
                <form onSubmit={(e)=>{submit(e)}} className='d-flex justify-content-center align-items-center p-5 rounded flex-column w-25'>
                    <input type="email" name='email' value={inputData.email} onChange={inputHendler} placeholder='Enter Your Email' className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <input type="password" name='password' value={inputData.password} onChange={inputHendler} placeholder='Enter Your Password' className="form-control mb-3" id="exampleInputPassword1" />
                    <button type="submit" className="btn btn-primary bt-3" >Submit</button>
                    <Link to='/signup'> I Don't have Account </Link>
                </form>
            </div>
        </>
    )
}

export default Login