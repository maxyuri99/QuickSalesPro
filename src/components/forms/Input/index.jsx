import React, { forwardRef } from "react"
import styles from "./style.module.scss"

export const Input = forwardRef(({ error, label, ...rest }, ref) => {
    return (
        <div >
            <div className={styles.flexbox}>
                <label className="paragraph center grey2">{label}</label>
                <input className={`${styles.inputiten} paragraph grey0`} ref={ref} {...rest} />
                {error ? <p className="paragraph negative center">{error.message}</p> : null}
            </div>
        </div>
    )
})
