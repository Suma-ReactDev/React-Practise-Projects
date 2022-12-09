 import { useEffect } from "react";
 const Alert = ({type, msg, removeAlert, list}) =>{
  useEffect (()=>{
    const identifier = setTimeout(()=>{
      removeAlert();
    },3000);
    return () => clearTimeout(identifier);
  },[list])
  return <p className={`mb-2 grid place-content-center text-base ${type==='danger'? 'bg-red-400':'bg-green-400'} `}>{msg}</p>
    
}
export default Alert;