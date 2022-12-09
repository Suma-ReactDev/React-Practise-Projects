import { useState, useCallback } from "react";

const useHttp = () =>{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [ptrnerror, setPtrnerror] = useState(false);
  const sendRequest = useCallback(
    async(requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try{
        const response = await fetch(requestConfig.url,{
          method:requestConfig.method?requestConfig.method:'GET',
          headers:{
            'Content-Type': 'application/json',
          },
          body:requestConfig.body?JSON.stringify(requestConfig.body):null,
        });
        if(!response.ok){
          throw new Error('Request failed');
        }
        const data = await response.json();
        applyData(data);
      }
      catch(err){
        setError(err.message || 'Something went wrong!');
        // console.log(err)
      }
      setIsLoading(false);
    },
    [],
  )
  
  return{
    isLoading,
    error,
    sendRequest,
    editId,
    deleteId,
    setEditId,
    ptrnerror,
    setPtrnerror,
  }
}
export default useHttp;