import React,{useState} from 'react'
import { Link ,useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signin = () => {
    const history = useHistory()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Plese Valid Email",classes:"#ef5350 red lighten-1"})
            return 
        }
        fetch("/api/admin/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
            }
            else{
                localStorage.getItem("jwt",data.token)
                localStorage.getItem("user",JSON.stringify(data.user))
                M.toast({html:"Login Successfully",classes:"#00e676 green accent-3"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Login</h2>
                <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button class="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>Login</button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}


export default Signin