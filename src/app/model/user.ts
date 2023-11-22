export interface User{
    id:string
    email:string
    name:string
    thumbnail:string
    role:'admin'|'user'
}

export interface Credential {
    email: string;
    password: string;
}