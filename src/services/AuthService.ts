

function login(username:string,password:string){
    localStorage.loggedIn=true; //temporary, will use webtoken
    localStorage.user_id=username;
    console.log(username)
    return localStorage.loggedIn
}

function isloggedin(){
    console.log("logged in: ", localStorage.loggedIn)
    return localStorage.loggedIn;
}

function logout(){
    console.log(localStorage.user_id, " logged out")
    localStorage.clear()
}

export {
    login,
    logout,
    isloggedin
};