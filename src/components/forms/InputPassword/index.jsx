import { forwardRef, useState } from "react"
// import styles from "./style.module.scss"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"

export const InputPassword = forwardRef(({ error, label, ...rest }, ref) => {
   const [isHidden, setIsHidden] = useState(true)

   return (
      <div>
         <label>{label}</label>
         <div>
            <input type={isHidden ? "password" : "text"} ref={ref} {...rest} />
            <button type="button" onClick={() => setIsHidden(!isHidden)}>
               {isHidden ? <MdVisibility /> : <MdVisibilityOff />}
            </button>
         </div>
         {error ? <p>{error.message}</p> : null}
      </div>
   )
})
