import React from 'react'
import { useDrag } from 'react-dnd'
import { Toast,ToastContainer } from 'react-bootstrap';
import {FaBug,FaTasks,FaCogs} from 'react-icons/fa';
import {BsThreeDots} from 'react-icons/bs'
import { ItemTypes } from './ItemTypes';
import axios from 'axios';

const Ticket = (props) =>{
    const tid = props.data.t_id;
    const [{isDragging}, dragRef] = useDrag(
        () => ({
          type: ItemTypes.CARD,
          item: {tid},
          end: (item ,monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {                
                axios.post("http://localhost:3001/api/updatestatus",{
                    ticket_id: item.tid,
                    target: dropResult.name
                }).then(()=>{
                    props.setdata([...props.t,{
                    t_title: props.data.t_title,
                    type: geticon(props.data.t_type),
                    t_desc: props.data.t_desc,
                    handledby:props.data.handled_by,
                    t_prio: props.data.t_prio,
                    due_date: dateconvert(props.data.due_date)
                    }])}
                ,()=>{})
            }
          },
          collect: (monitor) =>({
              isDragging: monitor.isDragging(),
          }),
        }),
    [tid],);

    //get icon
    const geticon = (type) =>{
        if(props.data.t_type === 'Task'){
            return(<FaTasks data-bs-toggle="tooltip" title="Task"/>);
        }else if(props.data.t_type === 'Bug'){
            return(<FaBug data-bs-toggle="tooltip" title="Bug"/>);
        }else if(props.data.t_type === 'Other'){
            return(<BsThreeDots data-bs-toggle="tooltip" title="Other"/>);
        }else{
            return(<FaCogs data-bs-toggle="tooltip" title="Feature"/>);
        }
    }

    //convert iso date format
    const dateconvert = (isodate) =>{
        let date = new Date(isodate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        let output;
        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        output = year+'-' + month + '-'+dt;
        }
        return(
            <div className='col'>
                {output}
            </div> 
        )
    }
    const opacity = isDragging ? 0.5 : 1
    
    return(
        <ToastContainer ref={dragRef} className="p-1" style={{border: isDragging? "5px solid blue": "0px",opacity}}>
            <Toast>
                <Toast.Header closeButton={false}>
                <strong className="me-auto">{props.data.t_title}</strong>
                <small><h5>{geticon(props.data.t_type)}</h5></small>
                </Toast.Header>
                <Toast.Body>
                    <div>
                        <p>{props.data.t_desc}</p>
                    </div>
                    <div className='border-top border-secondary row'>
                        <div className='col'>
                            Handled_by: 
                        </div>                       
                        <div className='col'>
                            {props.data.handled_by}
                        </div>                       
                    </div>
                    <div className='border-top border-secondary row'>
                        <div className='col'>
                            Priority: 
                        </div> 
                        <div className='col'>
                            {props.data.t_prio} 
                        </div>                         
                    </div>
                    <div className='border-top border-secondary row'>
                        <div className='col'>
                            Due:
                        </div> 
                        {dateconvert(props.data.due_date)}
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
export default Ticket;