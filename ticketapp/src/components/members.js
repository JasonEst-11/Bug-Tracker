import { Table } from 'react-bootstrap';
import axios from "axios";
import { React, useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import {IoArrowBackSharp,IoArrowForwardSharp} from 'react-icons/io5';
import AddMember from './modals/addmember';

const Members = ({project_id,permission}) =>{

    //fetch members of current project
    const [p_members, setMembers] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/api/projectmembers",{
            params:{
                Pid: project_id
            }
        }).then((response)=>{
            setMembers(response.data);
        })
    },[]);

    //Delete member
    const deleteMember = (id) =>{
        axios.post('http://localhost:3001/api/delmember',{
            memid: id,
            Pid: project_id
        }).then(()=>{
            axios.post('http://localhost:3001/api/delmembertickets',{
                memid: id,
                Pid: project_id
            }).then(()=>{alert("Removed "+id+" from project");window.location.reload();})
        },()=>{alert("Somethin went wrong.")})
    }

    //Change Role
    const changeRole = (id,oldrole) =>{
        let newrole = '';
        if(oldrole === 'Admin'){
            newrole = 'Developer';
        }else{
            newrole = 'Admin';
        }

        axios.post('http://localhost:3001/api/changeRole',{
            memid: id,
            Pid: project_id,
            role: newrole
        }).then(()=>{},()=>{})

        window.location.reload();
    }
      
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const rowperpage = 5;
    const pagesvisited = pageNumber * rowperpage;
     

    const pagecount = Math.ceil(p_members.length / rowperpage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    return(
        <>
            <div className='d-flex mb-3'>
                <h5>Contributors</h5> 
                <div className='ms-auto'>
                    <AddMember project_id={project_id} permission={permission} p_members={p_members} setMembers={setMembers}/>
                </div>         
            </div>  
            <div>
                <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {p_members.slice(pagesvisited, pagesvisited+rowperpage).map((val)=>{
                        return(
                            <tr key={val.email}>
                                <td>{val.fullname}</td>
                                <td>{val.email}</td>
                                <td>{val.role}</td>
                                <td>
                                {permission === 'Admin'&&
                                <div className="dropdown-container" tabIndex="-1">
                                    <div className="three-dots"></div>
                                    <div className="dropdown px-4 m-1 text-center">
                                        <a className='row' onClick={()=>{deleteMember(val.email)}}>Remove Member</a>
                                        <a className='row' onClick={()=>{changeRole(val.email,val.role)}}>Change Role</a>
                                    </div>
                                </div>
                                }
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            </div>            
            <div className='pag'>
                <ReactPaginate
                previousLabel={<IoArrowBackSharp/>}
                nextLabel={<IoArrowForwardSharp/>}
                pageCount={pagecount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                disabledLinkClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                />  
            </div>                    
        </>
    )
}

export default Members;