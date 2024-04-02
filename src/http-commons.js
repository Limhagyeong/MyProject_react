import axios from "axios";
// get, post, put, delete
export default axios.create({
    baseURL:"http://localhost",
    headers:{
        "Content-Type":"application/json"
    }
})
