import React from 'react';
import {BiLogOut,BiUser} from 'react-icons/bi';
import {IoTicketOutline} from 'react-icons/io5';
import {AiOutlineProject} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import axios from 'axios';
const  Sidebar = () =>{

    const destroysession = ()=>{
        axios.post("http://localhost:3001/api/logout");
    }

    return(
        <div className='sidebar'>
            <div className='container'>
                <h2>Bug Tracker</h2>
            </div>
            <Link id='link' to={'/profile'}><BiUser/> Profile</Link>
            <Link id='link' to={'/main'}><AiOutlineProject/> Projects</Link>
            <Link id='link' to={'/tickets'}><IoTicketOutline/> Tickets</Link>
            <Link id='link' to={'/'} onClick={destroysession}><BiLogOut/> Logout</Link>
        </div>
    );
   
}     

export default Sidebar;
      
