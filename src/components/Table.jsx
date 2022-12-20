import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, useHttp,usePaginationContext,PaginateComponent,Card } from './main';
import { useEffect, useState } from 'react';

const Table = ({ editItem, postRequest}) =>{
  const {sendRequest,error,isLoading}=useHttp();
  const { users, setUsers, currentItems} = usePaginationContext();
  const th= 'p-3 m-2 border-white border-seperate border-2 ';
  const td ='p-2 m-2 text-center';
  const baseUrl = `http://localhost:8081/api/users`;

  useEffect(()=>{
    sendRequest({url:`${baseUrl}`},setUsers);
  },[users]);

  return(
    <>
    {error?<Card className='flex text-2xl text-red-500 bg-red-100 place-content-center m-1'
      >{error}
        </Card>: <>
        <table className='capitalize w-full'>
        <thead className='bg-amber-500 p-2 m-2 '>
          <tr>
            <th className={th}>id</th>
            <th className={th}>first name</th>
            <th className={th}>last name</th>
            <th className={th}>email</th>
            <th className={th}>actions</th>
          </tr>
        </thead>
        <tbody>
        {currentItems && currentItems.map((employee)=>{
          {isLoading && <Card className='flex text-2xl text-cyan-500 bg-white place-content-center m-1'>Loading</Card>}
            return <tr key={employee.id} 
              className='bg-amber-100 border-2 border-white '>
            <td className={td}>{employee.id}</td>
            <td className={td}>{employee.firstName}</td>
            <td className={td}>{employee.lastName}</td>
            <td className={td}>{employee.emailId}</td>
            <td className={td}><Button className='text-green-400 hover:text-green-700 pr-1'
                onClick={()=>{editItem(employee.id)}}
                btnName={<FaEdit />}
                />
              <Button className='text-red-400 hover:text-red-700'
                onClick={()=>postRequest(`${baseUrl}/${employee.id}`, 'DELETE')}
                btnName={<FaTrash />}
                /> </td>
          </tr>
          })}
        </tbody>
      </table>
      <PaginateComponent />
        </>
      }

    </>
  )
}
export default Table;