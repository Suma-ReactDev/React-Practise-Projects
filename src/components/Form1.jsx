import {useState, useEffect, useRef} from 'react';
import {Card, Alert, Button, usePaginationContext, PaginateComponent, useHttp, Table} from './main'
import {inputs} from './helpers/data';
const Home = () => {
  const [ptrnErr, setPtrnErr ] = useState(false);
  const [lostFocus, setLostFocus] = useState(false);
  const ref= useRef();
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    emailId:''
  });
  const [alert, setAlert] = useState({show:true, msg:'', type:'success'});
  const { users } = usePaginationContext();
  const {isLoading, error, sendRequest, editId, setEditId} = useHttp();
  const showAlert = (show=false, type='', msg='') =>{
    setAlert({show,type,msg})
  }
  
  const baseUrl = `http://172.30.99.142:8081/api/v1/employees`;
  
  const editItem=(id)=>{
    console.log(id)
    // Works only when input is not null
    const specificItem=users.find((item)=>item.id===id);
    setFormData({...formData,...specificItem});
    setEditId(specificItem.id);
  }
  const cancelClick=()=>{
    
  }

  const onChange = (e) =>{
    // const validInput = !e.target.validity.patternMismatch;
    // if(ptrnErr){
    //   if(validInput){
    //     setPtrnErr(false)
    //   }
    // }
    e.preventDefault();
    console.log('onChangeHandler is fied')
  }
  const postRequest = async (baseUrl,method,formData) =>{
    sendRequest(
      {
        url:`${baseUrl}`,
        method:method,
        body:formData
      }
    )
  }
  const submitHandler = (e) =>{
    e.preventDefault();
    if (!(formData.firstName||formData.lastName||formData.emailId)) {
      showAlert(true,'danger','Fill in all fields')}
    else{
      postRequest(baseUrl,'POST',formData);
      editId && postRequest(`${baseUrl}/${editId}`,'PUT',formData);
      setFormData({...formData,emailId:'',firstName:'',lastName:''});
    }
  }

  const onBlur = (e) =>{
    setLostFocus(true);
    if(e.target.validity.patternMismatch && lostFocus===true){
      setPtrnErr(true);
    }
  }
 const FormInput =(props)=>{
   const {errorMsg,onChange,...inputprops}= props;
   return(
    <>
    <input {...inputprops} onChange={onChange}  />
    <p >{errorMsg}</p>
   </>
   )
 }
  return (
    <Card className={`bg-sky-700`}>
      <div className='flex mx-auto w-full gap-5'>
        <form className='grid w-1/2 mx-auto m-2 bg-lime-200 p-2' onSubmit={submitHandler} >
          {alert.show&&<Alert {...alert} removeAlert={showAlert}/>}
          {/* {inputs.map((input)=> (<FormInput key={input.id} {...input} value={formData[input.name]} onChange={onChangeHandler}  />)
          )} */}
          <input 
            type='text'
            placeholder='First Name'
            name='firstName'
            value={formData.firstName}
            className={`capitalize m-1 p-1 rounded`}
            onChange={onChange}
            pattern="^[a-zA-Z]+\s?[a-zA-Z]+"
            onBlur={onBlur}
            // ref={ref}
            lostfocus={lostFocus.toString()}
          />
          {ptrnErr && lostFocus && <p className='text-red-500 bg-red-100 p-1 m-1'>FirstName should include letters only!</p>}
          <input 
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={formData.lastName}
            className='capitalize m-1 p-1 rounded'
            onChange={onChange}
            pattern="^[a-zA-Z]+"
            onBlur={onBlur}
            lostfocus={lostFocus.toString()}
          />
          {ptrnErr && lostFocus && <p className='text-red-500 bg-red-100 p-1 m-1'>Lastname should include letters only!</p>}
          <input 
            type='email'
            placeholder='Email'
            name='emailId'
            value={formData.emailId}
            className=' m-1 p-1 rounded'
            onChange={onChange}
            onBlur={onBlur}
            lostfocus={lostFocus.toString()}
          />
          {ptrnErr && lostFocus && <p className='text-red-500 bg-red-100 p-1 m-1'>Please enter valid email!</p>}
          <Button 
            type='submit'
            btnName='submit'
            className={'bg-cyan-600 text-white m-5'}/>
        </form>
      </div>
      <input 
        type='search' />
      <Table 
        editItem={editItem}
        postRequest={postRequest}
        />
      <PaginateComponent />
    </Card>
  )
}

export default Home;