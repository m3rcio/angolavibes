import { createContext, useState } from "react";
import api, { setAccessToken } from "../services/api";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}:any)=>{
  const [user,setUser] = useState(null);

  const login = async (email:string,senha:string)=>{
    
    try{const res = await api.post("http://localhost:5000/api/auth/login",{email,senha});
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
    await api.post("/auth/logout");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
};


// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//      useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     if (token) {
//       // opcional: decodificar ou buscar perfil no backend
//       setUser({ logged: true });
//     }

//     setLoading(false);
//   }, []);

//    function login(userData, accessToken, refreshToken) {
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     setUser(userData);
//   }

//    function logout() {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setUser(null);
//   }

 

//    return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

//  export function useAuth() {
//   return useContext(AuthContext);
// }