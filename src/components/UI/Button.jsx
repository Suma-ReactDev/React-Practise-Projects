 const Button = ({btnName, className, onClick,...props}) =>{
  return(
    <button 
  className={`${className} uppercase font-bold rounded p-1 items-center border-transparent transition-colors ease-linear duration-350`}
  type={props.type || 'button'}
  onClick={onClick}
  > 
    {btnName}
  </button>
  )
}
export default Button;