const Card = ({className,children}) =>{
  return(
    <div className={`${className} p-5 w-4/5 mx-auto mt-10 rounded shadow-lg shadow-slate-500 transition-all ease-linear delay-100 duration-300 `}>{children}</div>
  )
}
export default Card;