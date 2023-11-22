import { User } from "src/app/model/user"

const getToken=()=>{
    return localStorage.getItem('token')
}
const getUser=()=>{
    let data = JSON.parse(localStorage.getItem("user")||"{}")
    if(Object.keys(data).length === 0){
        return null
    }
    return data
}
//const getRole=()=>{}


const saveToken=(token:string)=>{
    localStorage.setItem("token", token)
}
const saveUser=(user:User)=>{
    const {id, email, name, thumbnail, role} = user
    localStorage.setItem("user", JSON.stringify({
        id, email, name, thumbnail, role
    }))
}
//const saveRole=(role:string)=>{}


const deleteToken=()=>{
    localStorage.removeItem("token")
}
const deleteUser=()=>{
    localStorage.removeItem("user")
}
export {
    getToken,
    getUser,
    saveToken,
    saveUser,
    deleteToken,
    deleteUser,

}