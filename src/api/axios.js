import axios from "axios";
import tokenDecode from "jwt-decode";

const PROD_URL = 'https://concise-memory-371719.ew.r.appspot.com'
const DEV_URL = 'http://127.0.0.1:8000'

const CURRENT_URL = DEV_URL

const axios_instance = axios.create({
    baseURL : CURRENT_URL,
})

axios_instance.interceptors.request.use(async req => {
    
    const accessToken = localStorage.getItem('access_token') || null
    const refreshToken = localStorage.getItem('refresh_token') || null
    
    if(accessToken){
        
        const decodedToken = tokenDecode(accessToken)
        // console.log(decodedToken)
        // console.log(new Date().getTime())
        const isAccessTokenExpired = decodedToken.exp*1000 < new Date().getTime()
        if(!isAccessTokenExpired){
            req.headers.Authorization = `Bearer ${accessToken}`
        }else if(refreshToken){
            
            const refreshData = {'refresh_token': refreshToken}
            try{
                const resp = await axios.post(`${CURRENT_URL}/accounts/refresh`,refreshData )                
                localStorage.setItem('access_token',resp.data)
                req.headers.Authorization = `Bearer ${resp.data}`
            }catch{

            }
        }
    }
    return req
})

export default axios_instance;
