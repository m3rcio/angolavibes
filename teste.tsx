import {createContext, useContext, useLayoutEffect,useState,useEffect} from 'react';

// import api from api from './api';

const AuthCOntext= createContext(undefined);

export const useAuth=()=>{
    const authContext= useContext(AuthCOntext);
    if(!authContext){
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return authContext;
}

const AuthProvider=({children}:any)=>{
    const [token,setToken]=useState();

    useEffect(()=>{
        const fetchMe= async () =>{
            try{
                const response= await api.get('/api/me')
                    setToken(response.data.accessToken);
            }catch{
                setToken(null);
            }
        }
        fetchMe();
    }, []);

    useLayoutEffect(()=>{
        const authInterceptor=api.interceptors.request.use((config)=>{
            config.headers.Authorization=!config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
            return config;
        });

        return ()=>{
        api.interceptors.request.eject(authInterceptor);
    };
    },[token]);

    useLayoutEffect(()=>{
        const refreshInterceptor=api.interceptors.response.use(response=>response, async error=>{
            const originalRequest=error.config;
            if(error.response.status===403 && error.response.data.message==="Unauthorized"){
                try{ const response= await api.get('/api/refresh');
                setToken(response.data.accessToken);

                originalRequest.headers.Authorization=`Bearer ${response.data.accessToken}`;
                originalRequest._retry=true;
                return api(originalRequest);
                }catch{
                    setToken(null);
                }
            }
            return Promise.reject(error);
        }
    })
}