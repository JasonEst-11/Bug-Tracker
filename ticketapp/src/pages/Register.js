import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {

   const [fullname, setName] = useState("");
   const [email, setEmail] = useState("");
   const [pass, setPassword] = useState("");
   const [phone, setPhone] = useState("");
   const nav = useNavigate();

   const submitcreds = async () =>{
      if(fullname!=="" && email!==""&&pass!==""){
         axios.post('http://localhost:3001/api/register',{
            Fullname: fullname,
            Email: email,
            Pass: pass,
            Phone: phone,
         }).then(
         (response)=>{alert(response.data['message']);nav('/');},
         ()=>{alert('Someting went wrong');}
         );
      }else{
         alert("Please fill all required feilds")
      }
   }
    return ( 
         <>
            <div className='d-flex container justify-content-center align-items-center logo'>
                <h1 className='text-center text-white'>Register</h1>
            </div>
            <div className='container square-box d-flex justify-content-center align-items-center'>
               <div className='outline-register'>
                  <Form>
                     {/* fullname */}
                     <Form.Group className="mb-3">
                        <Form.Label>
                           Fullname:
                        </Form.Label>
                        <Form.Control type="text" onChange={(e) => {setName(e.target.value)}} maxlength="50"/>
                     </Form.Group>
                     {/* email */}
                     <Form.Group className="mb-3">
                        <Form.Label>
                           Email:
                        </Form.Label>                  
                           <Form.Control type="email" onChange={(e) => {setEmail(e.target.value)}} maxlength="50"/>
                     </Form.Group>
                     {/* password */}
                     <Form.Group  className="mb-3">
                        <Form.Label>
                           Password:
                        </Form.Label>                  
                           <Form.Control type="password" onChange={(e) => {setPassword(e.target.value)}} maxlength="30"/>                 
                     </Form.Group>
                     {/* phone */}
                     <Form.Group className="mb-3">
                        <Form.Label>
                           Phone:
                        </Form.Label>                  
                           <Form.Control type="phone" onChange={(e) => {setPhone(e.target.value)}} maxlength="10"/>                  
                     </Form.Group>
                     {/* Buttons */}
                     <Form.Group  className="mb-3">
                        <Form.Label>
                           <Link className='p-2' to='/'>Login</Link>
                        </Form.Label>                     
                        <Button onClick={submitcreds}>Submit</Button>
                     </Form.Group>
                  </Form>
               </div>
            </div>
         </>
     );
}

export default Register;