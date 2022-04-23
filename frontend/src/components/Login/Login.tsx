import * as React from "react";
import { Redirect, Link } from "react-router-dom";
import "./Login.css";

interface LoginProps{
    authenticate:(username:string, password:string)=>boolean;
    checkAuthentication:()=>boolean;
    createAccountRoute:string;
    redirectRoute:string;
}

function Login(props:LoginProps){

    if (props.checkAuthentication())
        return <Redirect to={props.redirectRoute}/>

    const [passwordValue, setPasswordValue] = React.useState("");
    const [usernameValue, setUsernameValue] = React.useState("");
    const loginCall = props.authenticate;
    console.log(props)
    return( 
        <div className="LoginComponent">
            <input value={usernameValue} onChange={e=>setUsernameValue(e.target.value)} placeholder="username" type="text"/>
            <input value={passwordValue} onChange={e=>setPasswordValue(e.target.value)} placeholder="password" type="text"/>
            <button onClick={()=>{loginCall(usernameValue, passwordValue);}}>Login</button>
            <div><div>Don't Have an Account?</div>
                <Link to={props.createAccountRoute}>Create Account</Link> 
            </div>
        </div>
    )
}

export {Login};