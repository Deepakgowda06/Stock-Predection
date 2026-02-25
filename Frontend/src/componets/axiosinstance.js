import axios from "axios";

const baseURL=import.meta.env.VITE_BACKEND_BASE_API
const axiosnstance=axios.create({
    baseURL:baseURL,
    headers:{
        "Content-Type":"application/json" 
    }
})
// resqest interceptors

axiosnstance.interceptors.request.use(
    function(config){
        console.log('requst withot headers =>',config)
        const accessToken=localStorage.getItem('AccessToken')
        if(accessToken){
            config.headers['Authorization']=`Bearer ${accessToken}`

        }
        return config

    },
    function(error){
        return Promise.reject(error);

    }

)



//Response interceptors


axiosnstance.interceptors.response.use(
    function(response){


        return response
    },
    //handel failed
    async function(error){
        const orginalRequest=error.config;  
        if((error.request.status==401 && !orginalRequest.retry)){
            orginalRequest.retry=true
            const refreshtoken=localStorage.getItem('RefreshToken')
            try{
                const response=await axiosnstance.post('/token/refresh/',{refresh:refreshtoken})
                console.log('new AccessToken ()=>',response.data)
                localStorage.setItem('AccessToken',response.data.access)
                orginalRequest.headers['Authorization']=`Bearer ${response.data.access}`
                return axiosnstance(orginalRequest )

            }catch(error){
                localStorage.removeItem("RefreshToken")
                localStorage.removeItem("AccessToken")
                window.location.href='/login'
            }
        }
        return Promise.reject(error)
    }
)
export default axiosnstance