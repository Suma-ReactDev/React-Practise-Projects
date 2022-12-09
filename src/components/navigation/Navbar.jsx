import {useState} from 'react'
import {NavLink, Link } from 'react-router-dom'
import { navItems, DropdownItems } from './NavItems'
import {RiArrowDropDownLine} from 'react-icons/ri'

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false)
  
  const activeLink ='flex relative w-20 p-2 m-2 rounded-sm font-medium text-lg bg-white text-cyan-700 transition-opacity underline'
  const normalLink ='flex relative w-20 bg-cyan-900 p-2 m-2 text-white rounded-sm font-medium text-lg hover:bg-white hover:text-cyan-900 hover:text-bg-cyan-900 hover:transition-opacity' 
  
  return (
    <header className='w-screen h-20 bg-cyan-700'>
      <nav className='flex'>
        <h1 className='flex justify-start text-center items-center text-3xl text-white font-medium m-5'>Welcome</h1>
        <ul className='flex w-full justify-evenly list-none items-center '>
          {navItems.map((item)=>{
            if(item.title === 'Forms'){
              return <li key={item.id}
                  className='flex relative'
                  onClick={()=>{setDropdown(!dropdown)}}
                  >
                    <NavLink
                      to={item.path}
                      className={({isActive})=>isActive?`${activeLink}`:`${normalLink}`}
                      >{item.title}<RiArrowDropDownLine className='absolute -right-2 pr-1 rounded-full font-extrabold text-3xl'
                      onClick={()=>{setDropdown(!dropdown)}}
                      />
                    </NavLink>
                    {dropdown && <ul className=' absolute top-10 left-2 mt-5 mb-4 bg-slate-100 p-3 text-cyan-700 font-medium rounded-sm' >
                      {
                        DropdownItems.map((item)=>{
                        return <li key={item.id} className='hover:bg-cyan-100 rounded-md p-2' >
                          <Link to={item.path} >{item.title}</Link>
                        </li>
                      })}
                      </ul>
                      }
                </li>
            }
            return <li key={item.id}
              className='flex'
              ><NavLink to={item.path}
                  className={({isActive})=>isActive ? activeLink : normalLink}  >{item.title}</NavLink>
              </li>
          })}
        </ul>
      </nav>
    </header>
  )
}
export default Navbar