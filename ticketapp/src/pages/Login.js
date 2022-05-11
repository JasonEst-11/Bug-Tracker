import axios from 'axios';
import {React, useEffect ,useState} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Form} from 'react-bootstrap';


axios.defaults.withCredentials = true;

const Login = () => {
    const[email, setEmail] = useState("");
    const[pass, setPassword] = useState("");
    const nav = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3001/api/login").then((response)=>{
            if(response.data.loggedIn === true){
                nav('/main');
            }
        })
    },[])

    const login = async () =>{
        axios.post("http://localhost:3001/api/login",{
            Email: email,
            Pass: pass
        }).then(
            (response)=>{
                if(response.data['confirm'] === true){
                    nav('/main');
                }else{
                    alert(response.data['message']);
                }},
            ()=>{alert("Something went wrong")}
        );
    }
    return ( 
        <>
            <div className='d-flex container justify-content-center align-items-center logo'>
                <h1 className='text-center text-white'>Bug Tracker</h1>
            </div>
            <div className='container square-box d-flex justify-content-center align-items-center'>
                <div className='outline-login'>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) =>{setEmail(e.target.value)}} maxLength="50"/>
                        </Form.Group>    
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) =>{setPassword(e.target.value)}} maxLength="30"/>
                        </Form.Group>    
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Show password" />
                        </Form.Group>                        
                        <Form.Group className="mb-3">
                            <Button onClick={login}>Login</Button>
                        </Form.Group>    
                        <Form.Group className="mb-3">
                            <p>Don't have an account? <Link to="/register">Register here</Link></p>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
     );
}

export default Login;