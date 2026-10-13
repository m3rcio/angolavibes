import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken } from "../services/api";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}:any)=>{
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const login= async (email:string,senha:string)=>{
    
    try{
      const res = await api.post("http://localhost:5000/api/auth/login",{email,senha});
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    console.log(res.data);
  
    alert("Login realizado com sucesso!");
  }catch(err:any){
      console.log(err.response?.data);
    }
  };

   const signup = async (nome:string,email:string,senha:string)=>{ 
    
    try{
      const res = await api.post("http://localhost:5000/api/auth/signup",{nome,email,senha});
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    console.log(res.data);
    alert("Login realizado com sucesso!");
  }catch(err:any){
      console.log(err.response?.data);
    }
  };

  const logout = async ()=>{
    await api.post("/api/auth/logout");
    setAccessToken(null);
    setUser(null);
  };

   const refresh = async () => {
    try {
      const res = await api.post("/api/auth/refresh");
      if(!res.data.accessToken){
         console.log("nenhum token de acesso fornecido!")
      }else{
        setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      }
     
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);
  return (
    <AuthContext.Provider value={{user,login,logout,signup,loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(){
  const context= useContext(AuthContext);
   if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

