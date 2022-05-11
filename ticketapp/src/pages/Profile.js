import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Passchange from '../components/modals/passchange';
import Sidebar from '../components/sidebar';

const Profile = () =>{
    const [fullname, setfullname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    
    useEffect(()=>{
        axios.get("http://localhost:3001/api/getuser").then((response)=>{
            setfullname(response.data[0].fullname);
            setemail(response.data[0].email);
            setphone(response.data[0].phone);
        })
    },[])
    

    const updateuser = () =>{
        axios.post("http://localhost:3001/api/updateuser",{
            fullname: fullname,
            email: email,
            phone: phone
        }).then(()=>{alert("Saved changes")})
    }
    
    return(
        <div>
            <Sidebar/>
            <div className='container-fluid panel'>
                <div className='m-1 p-1 text-center'>
                    <h3 className='text-white'>Profile</h3> 
                </div>         
                <div className="border rounded-3 border-1 border-secondary m-2 p-4 bg-white">
                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5 border border-2 border-dark" width="150px" alt='usericon' src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"/></div>
                            </div>
                            <div className="col-md-5 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Profile Settings</h4>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12"><label className="labels">Full Name</label><input type="text" className="form-control" value={fullname} onChange={(e)=>{setfullname(e.target.value)}} maxLength="50"/></div>
                                        <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" value={email} disabled/></div>
                                        <div className="col-md-12"><label className="labels">Phone</label><input type="text" className="form-control" value={phone} onChange={(e)=>{setphone(e.target.value)}} maxLength="10"/></div>                                    
                                    </div>                             
                                    <div className="mt-5 text-center">
                                        <button className="btn btn-primary profile-button m-2" type="button" onClick={updateuser}>Save Profile</button>
                                        <Passchange/>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;