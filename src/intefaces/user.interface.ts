export interface User{
    name:string,
    username:string,
    password:string,
    token?:string,
}

export interface UserResponse{
    name:string,
    username:string,
}