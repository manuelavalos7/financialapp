import React from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import { Login } from "./components"
import { AuthService } from "./services";

export interface RouteType{
  path:string;
  key:string;
  exact:boolean;
  component: React.ComponentType;
  routes: RouteType[];
  private: boolean;
}

export function PrivateRoute(route:RouteType){
  console.log(route)
  if (AuthService.isloggedin()){
    return <Route {...route}/>
  }
  else{
    return <Route {...route} component={()=><Redirect to="/login"/>}/>
  }

}

export function RenderRoutes(routes:RouteType[]){
  return routes.map((route:RouteType, i:number)=>{
        if(route.private) {
          return <PrivateRoute {...route} />
        }
        return <Route {...route}/>
      }) 
  
}
