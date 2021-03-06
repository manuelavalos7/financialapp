import React, { useState } from "react";
import { Switch, BrowserRouter, Link, Route} from "react-router-dom";
import { PrivateRoute, RenderRoutes, RouteType} from "./routes";
import {AuthService} from "./services";
import {Login, CreateAccount} from "./components";


const ROUTES: RouteType[] = [
  { path: "/", key: "ROOT", routes:[],exact: true, component: () => <h1>MAIN</h1>, private:true },
  { path: "/profile", key: "PROFILE", routes:[],exact: true, component: () => <h1>PROFILE PAGE</h1>, private:true },
  { path: "/add", key: "ADD", routes:[],exact: true, component: () => <h1>ADD PAGE</h1>, private:true },
];

const App = () =>{
  const [state, setState] = useState(false)
  const loginCallback = (username:string, password:string)=>{
    const loginResult = AuthService.login(username, password);
    setState(!state)
    return loginResult 
  }
  const createAccountRoute = "/createaccount"
  const createUser:(username:string, password:string)=>boolean = (username:string, password:string)=>{return false}
  const loginProps = {authenticate:loginCallback, checkAuthentication:AuthService.isloggedin, redirectRoute:"/", createAccountRoute:createAccountRoute}
  const createProps = {checkAuthentication:AuthService.isloggedin, createUser, redirectRoute:"/", loginRoute:""}
  const NotFound = ()=><div>404 not found</div>
  return(
    <div>
      <BrowserRouter>
          <Switch>
            <Route path="/login" exact render={()=><Login {...loginProps}/>}/>
            <Route path={createAccountRoute} exact render={()=><CreateAccount {...createProps}/>}/>
            {RenderRoutes(ROUTES)}
            <Route component={NotFound}/>
          </Switch>
      </BrowserRouter>
      {AuthService.isloggedin()===undefined ? undefined : <button onClick={()=>{AuthService.logout(); setState(!state);}}>{localStorage.user_id}Log out</button> }
    </div>
  )
};

export default App;