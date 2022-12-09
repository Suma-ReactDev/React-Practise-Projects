import { useHttp } from "../main";
const FormInput = ({onChange,errorMsg, ...props}) =>{
  const {ptrnerror, setPtrnerror} = useHttp();
  const onBlurHandler = (e) =>{
    if(e.target.validity.patternMismatch){
      setPtrnerror(true);
    }
  }
  return(
    <>
      <input onChange={onChange} {...props} className='m-1 p-1 peer' onBlur={onBlurHandler} />
      <p className={`text-red-500 bg-red-100 p-1 m-1 hidden ${ptrnerror===true?'peer-invalid:block':null}`}>{errorMsg}</p>
    </>
  )
}
export default FormInput;