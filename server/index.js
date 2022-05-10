const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');

const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const { response } = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 9;

let current_user = "";//not ideal 

//database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ticketsystem',
});

//middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials: true
}));
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "this is the secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 60*60*24,
    },
}))

app.get('/',(req,res)=>{
    res.send("working");
})

//Register 
app.post('/api/register',(req,res)=>{
    const fullname = req.body.Fullname;
    const email = req.body.Email;
    const pass = req.body.Pass;
    const phone = req.body.Phone;
    bcrypt.hash(pass,saltRounds,(err,hash)=>{
        if(err){
            console.log(err);            
        }
        db.query('insert into users(fullname,email,password,phone) values (?,?,?,?)',[fullname,email,hash,phone],(err,result)=>{
            if(err){
                res.send({message: err});
            }else{
                res.send({message: "Register Successfull"});
            }
        })
    })
})

//Login
app.get('/api/login',(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
})
app.post('/api/login',(req,res)=>{
    const email = req.body.Email;
    const pass = req.body.Pass;
    const sql = "select * from users where email = ?";
    db.query(sql,email,(err,result)=>{
        if(err){
            console.log(err);
        }
        if (result.length > 0){
            bcrypt.compare(pass,result[0].password,(error,response)=>{
                if(response){
                    req.session.user = result[0].email;
                    current_user = result[0].email;
                    res.send({confirm: true});
                }else{
                    res.send({message: "Wrong email and password combinaiton!"});
                }
            })
        }else{
            res.send({message: "Email not found"});
        }
    });
})

//logout
app.post('/api/logout',(req,res)=>{
    req.session.destroy();
    current_user = "";
})

//Get Current user detail
app.get('/api/getuser',(req,res)=>{
    const sql = "SELECT * FROM users where email = ?";
    db.query(sql,[current_user],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

//Password change 
app.post('/api/passchange',(req,res)=>{
    const npass = req.body.newpass
    bcrypt.hash(npass,saltRounds,(error,hash)=>{
        if(error){
            console.log(err);
        }
        const sql = "update users set password = ? where email = ?";
        db.query(sql,[hash,current_user],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })
    })
})

//Update user
app.post('/api/updateuser',(req,res)=>{
    const fullname = req.body.fullname;
    const email = req.body.email;
    const phone = req.body.phone;
    sql = "update users set fullname = ?, email = ?, phone = ? where email = ?";
    db.query(sql,[fullname,email,phone,current_user],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            current_user = email;
            res.send(result);
        }
    });
})

//Get all projects
app.get('/api/projects',(req,res)=>{
    const sql = "SELECT * FROM projects p join project_members pm on p.proj_id = pm.project_id where pm.user_id = ?";
    db.query(sql,[current_user],(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
})

//Get members
app.get('/api/projectmembers',(req,res)=>{
    const sql = "SELECT * FROM project_members pm JOIN users u on pm.user_id = u.email where project_id = ?";
    db.query(sql,[req.query.Pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//New project
app.post('/api/newproject',(req,res)=>{
    const name = req.body.Name;
    const desc = req.body.Desc;
    const sql = "insert into projects(proj_name,proj_desc)values('"+name+"','"+desc+"')";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);     
        }
    })   
});

//After new project
app.post('/api/roletoproj',(req,res)=>{
    const insertid = req.body.insertid;
    const sql = "insert into project_members(project_id,user_id,role) values ('"+insertid+"','"+current_user+"','Admin')";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);     
        }
    })
})

//Delete project
app.post('/api/deleteproject',(req,res)=>{
    const pid = req.body.Pid;
    const sql = "delete from projects where proj_id = ?";
    db.query(sql,[pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);     
        }
    })
})
//Delete members of project
app.post('/api/deletemembers',(req,res)=>{
    const pid = req.body.Pid;
    const sql = "delete from project_members where project_id = ?";
    db.query(sql,[pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);     
        }
    })
})
//Delete tickets of project
app.post('/api/deletetickets',(req,res)=>{
    const pid = req.body.Pid;
    const sql = "delete from tickets where t_proj_id = ?";
    db.query(sql,[pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);     
        }
    })
})

//Edit project
app.post('/api/editproject',(req,res)=>{
    const name = req.body.name;
    const desc = req.body.desc;
    const pid = req.body.Pid
    const sql = "update projects set proj_name = ?, proj_desc = ? where proj_id = ?";
    db.query(sql,[name,desc,pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Get role
app.get('/api/role',(req,res)=>{
    const sql = "SELECT * FROM project_members pm join projects p on pm.project_id = p.proj_id WHERE p.proj_id = ? and pm.user_id = ?";
    db.query(sql,[req.query.Pid,current_user],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Add  member 
app.post('/api/addmember',(req,res)=>{
    const uid = req.body.Uid;
    const pid = req.body.Pid;
    let sql = "insert into project_members(project_id,user_id,role)values(?,?,'Developer')";
    db.query(sql,[pid,uid],(err,result)=>{
        if(err) {console.log(err)}
    })
})

//Delete member
app.post('/api/delmember',(req,res)=>{
    const memid = req.body.memid;
    const pid= req.body.Pid;
    let sql = "DELETE FROM project_members WHERE user_id = ? and project_id = ?";
    db.query(sql,[memid,pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
//Unlist assigned tickets from deleted member
app.post('/api/delmembertickets',(req,res)=>{
    const memid = req.body.memid;
    const pid= req.body.Pid;
    let sql = "update tickets set handled_by = null where handled_by = ? and t_proj_id = ?";
    db.query(sql,[memid,pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Change Role
app.post('/api/changeRole',(req,res)=>{
    const memid = req.body.memid;
    const pid= req.body.Pid;
    const newrole = req.body.role
    let sql = "update project_members set role = ? where user_id = ? and project_id = ?";
    db.query(sql,[newrole,memid,pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Get backlog
app.get('/api/backlog',(req,res)=>{
    const sql = "SELECT * FROM tickets where t_proj_id = ? and t_status = 'Backlog';";
    db.query(sql,[req.query.Pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Add ticket to board
app.post('/api/puttoDo',(req,res)=>{
    const sql = "update tickets set t_status = 'To Do' where t_id = ?";
    db.query(sql,[req.body.tid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Delete ticket from backlog
app.post('/api/deleteticket',(req,res)=>{
    let sql = "delete from tickets where t_id = ?";
    db.query(sql,[req.body.tid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Get tickets handled by current user
app.get('/api/ticketsbyuser',(req,res)=>{
    const sql = "SELECT * FROM tickets where handled_by = ?";
    db.query(sql,[current_user],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Get tickets
app.get('/api/tickets',(req,res)=>{
    const proj_id = req.query.Pid;
    const state = req.query.state;
    const sql = "SELECT * FROM tickets where t_status = ? and t_proj_id = ?";
    db.query(sql,[state,proj_id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Add ticket
app.post('/api/addticket',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const member = req.body.member;
    const type = req.body.type;
    const priority = req.body.priority;
    const status = req.body.status;
    const date = req.body.date;
    const pid = req.body.Pid;
    let sql = '';
    if(member == ''){
        sql = "insert into tickets(t_title,t_desc,t_proj_id,t_type,t_prio,t_status,due_date) values('"+title+"','"+description+"',"+pid+",'"+type+"','"+priority+"','"+status+"','"+date+"')";
    }else{
        sql = "insert into tickets(t_title,t_desc,t_proj_id,handled_by,t_type,t_prio,t_status,due_date) values('"+title+"','"+description+"',"+pid+",'"+member+"','"+type+"','"+priority+"','"+status+"','"+date+"')";
    }    
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Update state of ticket
app.post('/api/updatestatus',(req,res)=>{
    const ticket_id = req.body.ticket_id;
    const target = req.body.target;
    sql = "Update tickets set t_status = ?, handled_by = ? where t_id = ?";
    db.query(sql,[target,current_user,ticket_id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//Resolve done tickets
app.post('/api/resolve',(req,res)=>{
    const sql = "delete from tickets where t_proj_id = ? and t_status = 'Done'";
    db.query(sql,[req.body.Pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

//chart data
app.get('/api/chartdata',(req,res)=>{
    const col = req.query.column;
    const pid = req.query.Pid;
    const sql = "SELECT "+col+" as name, COUNT(*) as value FROM tickets where t_proj_id = ? GROUP BY "+col
    db.query(sql,[pid],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.listen('3001', ()=>{
    console.log("running on port 3001");
});