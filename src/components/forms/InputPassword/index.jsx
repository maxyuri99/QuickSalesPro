import { forwardRef, useState } from "react"
// import styles from "./style.module.scss"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"

export const InputPassword = forwardRef(({ error, label, ...rest }, ref) => {
   const [isHidden, setIsHidden] = useState(true)

   return (
      <div className="flexgap1">
         <label className="paragraph center grey2">{label}</label>
         <div>
            <input type={isHidden ? "password" : "text"} className="input paragraph" ref={ref} {...rest} />
            {/* <button type="button" className="paragraph grey0" onClick={() => setIsHidden(!isHidden)}>
               {isHidden ? <MdVisibility /> : <MdVisibilityOff />}
            </button> */}
         </div>
         {error ? <p className="paragraph negative center">{error.message}</p> : null}
      </div>
   )
})
