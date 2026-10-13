import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use(config => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
let isRefreshing=false;
let refreshPromise:Promise<string> | null=null;

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // se der 401 e não for um retry e não tentou se conectar a /refresh e /login
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh") && !originalRequest.url.includes("/api/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        if(!isRefreshing){
          isRefreshing=true;
          
          refreshPromise = api.post("/api/auth/refresh").then(res=>{

            const newAccessToken=res.data.accessToken;
            setAccessToken(res.data.accessToken);
           
            return  api(originalRequest);
            
          }).finally(()=>{
            isRefreshing=false;
            refreshPromise=null;
          })

        }else{
          const newAccessToken= await refreshPromise;

          originalRequest.headers.Authorization= `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
        

      } catch(error) {
        setAccessToken(null);
        api.post("/api/auth/logout");
         return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;