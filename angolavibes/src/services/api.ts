import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

let accessToken:string | null = null;

export const setAccessToken = (token:string|null)=>{
  accessToken = token;
};

api.interceptors.request.use(config=>{
  if(accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async error=>{
    if(error.response?.status === 401){
      try{
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.accessToken);
        error.config.headers.Authorization =
          `Bearer ${res.data.accessToken}`;
        return api(error.config);
      }catch{
        window.location.href="/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;



// import axios from "axios";

// const api= axios.create({
//     baseURL:"http://localhost:5000"
// });

// api.interceptors.request.use(config => {
//     const token= localStorage.getItem("accessToken");
//     if(token){
//         config.headers.Authorization=`Bearer ${token}`;
//     }return config;
// });

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refreshToken = localStorage.getItem("refreshToken");

//       const res = await axios.post("http://localhost:5000/refresh", {
//         refreshToken
//       });

//       localStorage.setItem("accessToken", res.data.accessToken);

//       originalRequest.headers.Authorization =
//         `Bearer ${res.data.accessToken}`;

//       return api(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );


// export default api;
