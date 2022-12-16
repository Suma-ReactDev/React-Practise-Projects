import {useState} from 'react';
import {Card, Alert, Button, usePaginationContext, useHttp, Table, FormInput} from './main'
import {inputs} from './helpers/data';

const Home = () => {
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    emailId:''
  });
  const [alert, setAlert] = useState({show:true, msg:'', type:'success'});
  const { users } = usePaginationContext();
  const {isLoading, sendRequest, editId, setEditId,ptrnerror, setPtrnerror} = useHttp();
  const showAlert = (show=false, type='', msg='') =>{
    setAlert({show,type,msg})
  }

  const baseUrl = `http://172.30.99.142:8081/api/users`;
  
  const editItem=(id)=>{
    console.log(id)
    // Works only when input is not null
    const specificItem=users.find((item)=>item.id===id);
    setFormData({...formData,...specificItem});
    console.log(formData);
    specificItem && setEditId(specificItem.id)
  }

  const onChange = (e) =>{
    const newValidInput = !e.target.validity.patternMismatch;
    ptrnerror && newValidInput && setPtrnerror(false);
    setFormData({...formData,[e.target.name]:e.target.value})
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
      console.log(formData);
      console.log(editId);
      postRequest(baseUrl,'POST',formData);
      editId && postRequest(`${baseUrl}/${editId}`,'PUT',formData);
      setFormData({...formData,emailId:'',firstName:'',lastName:''});
    }
  }

  return (
    <Card className={`bg-sky-700`}>
      <div className='flex mx-auto w-full gap-5'>
        <form className='grid w-1/2 mx-auto m-2 bg-lime-200 p-2' onSubmit={submitHandler} >
          {alert.show&&<Alert {...alert} removeAlert={showAlert}/>}
          {inputs.map((input)=>{
            return <FormInput {...input} key={input.id} onChange={onChange} value={formData[input.name]}  className='capitalize m-1 p-1 rounded'/>
          })}
          <Button 
            type='submit'
            btnName={'submit'}
            className={'bg-cyan-600 text-white m-2'}/> 
        </form>
      </div>
      <Table 
        editItem={editItem}
        postRequest={postRequest}
        />
    </Card>
  )
}

export default Home;