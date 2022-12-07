import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
  const [inputData, setInputData] = useState({ email: '', password: '',name:'',phone:'' });
  const  navigate = useNavigate()

    const inputHendler = e => setInputData({ ...inputData, [e.target.name]: e.target.value });

    const submit = async e => {
      e.preventDefault()
      // console.log(inputData)
        try {
            const  {data} = await axios.post(`http://localhost:3002/create/user`,inputData);
            navigate('/login');
            setInputData({ email: '', password: '',name:'',phone:'' });
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
       }
     }
  return (
    <>
      <div className="signup d-flex justify-content-center align-items-center">
                <form onSubmit={(e)=>{submit(e)}} className='d-flex justify-content-center align-items-center  p-5 rounded flex-column w-25'>
                    <input type="text" placeholder='Enter Your Name' name='name' value={inputData.name} onChange={inputHendler} className="form-control mb-3"  />
                    <input type="email" placeholder='Enter Your Email' name='email' value={inputData.email} onChange={inputHendler} className="form-control mb-3"  />
                    <input type="password" placeholder='Enter Your Password' name='password' value={inputData.password} onChange={inputHendler} className="form-control mb-3"/>
                    <input type="number" placeholder='Enter Your Phone' name='phone' value={inputData.phone} onChange={inputHendler} className="form-control mb-3"/>
                    <button type="submit" className="btn btn-primary bt-3" >Submit</button>
                    <Link to='/login'> I have Account </Link>
                </form>
            </div>
    </>
  )
}

export default Signup