import * as React from "react";
import { Redirect, Link } from "react-router-dom";
import "./CreateAccount.css"

interface CreateAccountProps{
  checkAuthentication:()=>boolean;
  createUser:(username:string, password:string)=>boolean; 
  redirectRoute:string;
  loginRoute:string;
}

function CreateAccount(props: CreateAccountProps){
  const [state, setState] = React.useState({username:"", email:"", password:"", confirmPassword:""})
  const handleChange=(e:any)=>{
    const key:string = e.target.name
    setState({ ...state, [e.target.name]: e.target.value});
  }

  const submitCreate = ()=>{
    console.log(state)
  }

  if ( props.checkAuthentication()){
    return <Redirect to="/"/>
  }
  return (
    <div className="CreateAccountComponent">
      {(Object.keys(state) as [keyof typeof state]).map((key)=>{
        const placeholder = key==="confirmPassword" ? "retype password" : key
        return(<input type="text" name={key} key={key} placeholder={placeholder} value={state[key]} onChange={handleChange}/>)
      })}
      <button onClick={submitCreate}>Create Account</button>
      <p>Already have an account? <Link to={props.loginRoute}>Login</Link></p>
    </div>
  ) 

}
export {CreateAccount};