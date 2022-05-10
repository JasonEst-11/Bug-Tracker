import {React,useState,useEffect} from 'react';
import {PieChart,Pie,Tooltip,Cell,Legend} from 'recharts';
import axios from 'axios';

const Chart = ({projectid}) =>{
    const [status, setStatus] = useState([]);
    const [priority, setPrio] = useState([]);
    const [type, setType] = useState([]);
    
    useEffect(()=>{   
        axios.get("http://localhost:3001/api/chartdata",{
            params:{
                Pid: projectid,
                column: 't_status'
            }
        }).then((response)=>{
            setStatus(response.data); 
        })
        axios.get("http://localhost:3001/api/chartdata",{
            params:{
                Pid: projectid,
                column: 't_prio'
            }
        }).then((response)=>{
            setPrio(response.data); 
        })
        axios.get("http://localhost:3001/api/chartdata",{
            params:{
                Pid: projectid,
                column: 't_type'
            }
        }).then((response)=>{
            setType(response.data); 
        })
    },[]);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };
    return( 
        <div className='row'>
            <div className='col border rounded-3 border-1 border-secondary m-2 p-3'>
                <h5>Ticket by Type</h5>
                <PieChart width={400} height={320}>
                    <Pie
                    data={type}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={false}
                    label
                    >
                        {type.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                </PieChart>
            </div>
            
            <div className='col border rounded-3 border-1 border-secondary m-2 p-3'>
                <h5>Tickets by Priority</h5>
                <PieChart width={400} height={320}>
                    <Pie
                    data={priority}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={false}
                    label
                    >
                        {priority.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>            
                    <Tooltip/>
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                </PieChart>
            </div>
            
            <div className='col border rounded-3 border-1 border-secondary m-2 p-3'>
                <h5>Tickets by Status</h5>
                <PieChart width={400} height={320}>
                    <Pie
                    data={status}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={false}
                    label
                    >
                        {status.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                </PieChart> 
            </div>
        </div>      
    )
}
export default Chart;