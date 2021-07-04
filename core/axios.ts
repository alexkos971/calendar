import Axios from "axios";

const instance = Axios.create({
    // withCredentials: true,
    // headers: {
        // 'Access-Control-Allow-Origin': true
    // }
})

// instance.interceptors.request.use((config) => {
//     if (typeof window !== "undefined" ) {
//         config.headers.Authorization = window.localStorage.getItem('token')
//     }
//     return config;
// })

export default instance;