//for getting users and creare users. update, etc.
export interface User{
    name:string,
    username:string,
    password:string,
    token?:string,
}

//for response
export interface UserResponse{
    name:string,
    username:string,
    accessToken?:string,
    refreshToken?:string,
    expiredIn?:string,
}

//for login
export interface UserLogin{
    username:string,
    password:string,
}

//for jwt 
export interface UserJwt{
    username:string,
    name:string,
}