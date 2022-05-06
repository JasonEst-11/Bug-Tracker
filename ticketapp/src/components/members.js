import { Table, Dropdown} from 'react-bootstrap';
import axios from "axios";
import { React, useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import {IoArrowBackCircle,IoArrowForwardCircle} from 'react-icons/io5';

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
        }).then(()=>{},()=>{})

        window.location.reload();
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
    
    //Dropdown permision
    const droppermission = (id,role)=>{
        if(permission === "Admin"){
            return(
                <>
                    <Dropdown.Item onClick={()=>{deleteMember(id)}}>Remove Member</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{changeRole(id,role)}}>Change Role</Dropdown.Item>
                </>
            )
        }else{
            return(
                <>
                    <Dropdown.Item onClick={()=>{deleteMember(id)}} disabled>Remove Member</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{changeRole(id,role)}} disabled>Change Role</Dropdown.Item>
                </>
            )
        }
    }
    
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const rowperpage = 5;
    const pagesvisited = pageNumber * rowperpage;
    
    const displayMembers = p_members.slice(pagesvisited, pagesvisited+rowperpage).map((val)=>{
        return(
            <tr key={val.email}>
                <td>{val.fullname}</td>
                <td>{val.email}</td>
                <td>{val.role}</td>
                <td>
                <Dropdown>
                        <Dropdown.Toggle variant='secondary'> 
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {droppermission(val.user_id,val.role)}
                    </Dropdown.Menu>
                </Dropdown>
                </td>
            </tr>
        )
    })

    const pagecount = Math.ceil(p_members.length / rowperpage);
    const changePage = ({selected}) =>{
        setPageNumber(selected);
    }

    return(
        <div>
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
                    {displayMembers}
                </tbody>
            </Table>
            </div>            
            <div className='pag'>
                <ReactPaginate
                previousLabel={<IoArrowBackCircle/>}
                nextLabel={<IoArrowForwardCircle/>}
                pageCount={pagecount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                disabledLinkClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                />  
            </div>                    
        </div>
    )
}

export default Members;