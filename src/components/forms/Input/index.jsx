import React, { forwardRef } from "react"

export const Input = forwardRef(({ error, label, ...rest}, ref) => {
    return (
        <div className="flexgap1">
            <label className="paragraph center grey2">{label}</label>
            <input className="input paragraph grey0" ref={ref} {...rest}/>
            {error ? <p className="paragraph negative center">{error.message}</p>:null}
        </div>
    ) 
})